import { Request, Response } from 'express';
import UserService from '../services/user.service';
import LogService from "../services/log.service";
import mongoose from "mongoose";

export interface AuthRequest extends Request {
  user?: any;
}

class UserController {
  public async register(req: Request, res: Response): Promise<void> {
    try {
      const user = await UserService.register(req.body);
      const userId = user._id as mongoose.Types.ObjectId;

      await LogService.addEventToLog({
        eventType: "user_register",
        userId,
        details: "User register in successfully",
        ipAddress: req.ip || "Unknow IP",
        userAgent: req.headers["user-agent"] || "Unknown",
      });

      res.status(201).json({ ...user.toObject(), password: undefined });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const { user, token } = await UserService.login(email, password);

      const userId = user._id as mongoose.Types.ObjectId;

      await LogService.addEventToLog({
        eventType: "user_login",
        userId,
        details: "User logged in successfully",
        ipAddress: req.ip || "Unknow IP",
        userAgent: req.headers["user-agent"] || "Unknown",
      });

      await UserService.updateLastLoginStatus(user.id);

      res.status(200).json({ token, user: { ...user.toObject(), password: undefined } });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  public async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await UserService.getUsers();
      res.status(200).json(users);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  public async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const user = await UserService.getUserById(req.params.id);
      if (!user) res.status(404).json({ message: 'User not found' });
      else res.status(200).json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  public async getProfile(req: AuthRequest, res: Response): Promise<void> {
    try {
      const user = await UserService.getUserById(req.user.id);
      if (!user)
        res.status(404).json({ message: 'User not found' });
      res.status(200).json(user);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async updateUser(req: AuthRequest, res: Response): Promise<void> {
    try {
      const user = req.user as { id: string };
      if (!user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }
      const userId = user.id;

      const updatedUser = await UserService.updateUser(userId, req.body);
      if (!updatedUser) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      res.status(200).json(updatedUser);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }


  public async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await UserService.deleteUser(req.params.id);
      if (!user) res.status(404).json({ message: 'User not found' });
      else res.status(200).json({ message: 'User deleted' });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  public async changePassword(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { oldPassword, newPassword } = req.body;
      const userId = req.user.id;

      if (!oldPassword || !newPassword) {
        res.status(400).json({ message: 'Old password and new password are required' });
        return;
      }

      await UserService.changePassword(userId, oldPassword, newPassword);
      res.status(200).json({ message: 'Password changed successfully' });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  public async getUserActivity(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id;
      const activity = await UserService.getUserActivity(userId);
      if (!activity) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.status(200).json(activity);
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async changeAvatar(req: AuthRequest, res: Response): Promise<void> {
    try {
      const user = req.user as { id: string };
      if (!user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }
      const userId = req.user.id;

      if (!req.file) {
        res.status(400).json({ message: 'No file uploaded' });
      }

      const fileUrl = (req.file as any).location;

      await UserService.updateAvatar(userId, fileUrl);

      res.status(200).json({
        message: 'Avatar updated successfully',
        avatarUrl: fileUrl,
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

}

export default new UserController();
