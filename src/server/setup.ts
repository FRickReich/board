import Board from './Models/Board';
import BoardCategory from './Models/BoardCategory';
import BoardSubCategory from './Models/BoardSubCategory';
import BoardPost from './Models/BoardPost';
import BoardThread from './Models/BoardThread';

import { createNewUser } from './Utils/CreateNewUser';
import { SlugifyString } from './Utils/SlugifyString';

const initialSetup = () =>
{
    Board.countDocuments(async (err: Error, amount: number) =>
    {
        if(amount === 0)
        {
            createNewUser(
                { email: 'admin@example.com', isVerified: true, password: 'admin' },
                { userName: 'admin' },
                { isAdmin: true, isModerator: false, isMember: false },
                (newUser) =>
                {
                    const newBoard = new Board();
                    const newCategory = new BoardCategory();
                    const newSubCategory = new BoardSubCategory();
                    const newThread = new BoardThread();
                    const newPost = new BoardPost();

                    newBoard.title = 'My Board';
                    newBoard.categories = newCategory._id;
                    newBoard.adminUser = newUser._id;

                    newCategory.title = 'General Discussion';
                    newCategory.parent = newBoard._id;
                    newCategory.subCategories = newSubCategory._id;
                    newCategory.slug = SlugifyString('General Discussion');

                    newSubCategory.title = 'Off-Topic Discussion';
                    newSubCategory.parent = newCategory._id;
                    newSubCategory.threads = newThread._id;
                    newSubCategory.slug = SlugifyString('Off-Topic Discussion');

                    newThread.title = 'Welcome';
                    newThread.authorId = newUser._id;
                    newThread.parent = newSubCategory._id;
                    newThread.posts = newPost._id;
                    newThread.slug = SlugifyString('Welcome');

                    newPost.body = 'Hello World!';
                    newPost.authorId = newUser._id;
                    newPost.parent = newThread._id;

                    newCategory.save();
                    newSubCategory.save();
                    newThread.save();
                    newPost.save();
                    newBoard.save().then(savedBoard => console.log(savedBoard.categories));
                }
            );
        }
    });
};

export default initialSetup;
