import { Request, Response } from 'express';
import UserService from '../services/user.service';

class UserController {
  public async register(req: Request, res: Response): Promise<void> {
    try {
      const user = await UserService.register(req.body);
      res.status(201).json({ ...user.toObject(), password: undefined });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const { user, token } = await UserService.login(email, password);
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

  public async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await UserService.updateUser(req.params.id, req.body);
      if (!user) res.status(404).json({ message: 'User not found' });
      else res.status(200).json(user);
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
}

export default new UserController();
