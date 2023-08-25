import express from "express";

declare global {
  namespace Express {
    interface Request {
      usuario?: {
        login: string;
        role: number;
      };
    }
  }
}
