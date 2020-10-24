import { Request, Response } from 'express';
import Board, { IBoard } from './../../Models/Board';

export const getBoardInfo = (req: Request, res: Response)  =>
{
    Board.find((err: Error, board: IBoard) =>
    {
        if(err) return res.status(401).json({ success: false, error: true, message: err.message });
        if (board) return res.send({ success: true, board });
    });
}