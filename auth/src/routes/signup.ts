import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { User } from '../models/users';
import { validateRequest, BadRequestError } from '@lwtickets/common';
import jwt from 'jsonwebtoken';

const router = express.Router();
const signupValidation = [
  body('email').isEmail().withMessage('Email must be valid'),
  body('password')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Password must be between 4 and 20 characters')
];

router.post(
  '/api/users/signup',
  signupValidation,
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Email in use');
    }

    const user = User.build({ email, password });

    await user.save();
    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email
      },
      process.env.JWT_KEY!
    );

    // Store it on cookieSession object
    req.session = {
      jwt: userJwt
    };

    // Status 201 for record created
    res.status(201).send(user);
  }
);

export { router as signupRouter };
