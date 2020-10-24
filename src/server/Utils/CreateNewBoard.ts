import mongoose from 'mongoose';
import Board, {IBoard} from './../Models/Board';
import ObjectId = mongoose.Types.ObjectId;

interface INewBoard { title: string; adminUser: ObjectId; }

type newBoardCallback = ( result?: IBoard )  => void;

export const createNewBoard = (board: INewBoard, callback: newBoardCallback) =>
{
    const newBoard = new Board(board);

    newBoard
        .save()
        .then(savedBoard => callback(savedBoard))
        .catch(err => new Error(err));
};