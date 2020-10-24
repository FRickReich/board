import Board from './Models/Board';
import BoardCategory from './Models/BoardCategory';
import BoardSubCategory from './Models/BoardSubCategory';
import BoardPost from './Models/Post';
import BoardThread from './Models/Thread';

import { createNewUser } from './Utils/CreateNewUser';

const initialSetup = () =>
{
    Board.countDocuments(async (err, amount) =>
    {
        if(amount === 0 )
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

                    newSubCategory.title = 'Off-Topic Discussion';
                    newSubCategory.parent = newCategory._id;
                    newSubCategory.threads = newThread._id;

                    newThread.title = 'Welcome';
                    newThread.authorId = newUser._id;
                    newThread.parent = newSubCategory._id;
                    newThread.posts = newPost._id;

                    newPost.body = 'Hello World!';
                    newPost.authorId = newUser._id;
                    newPost.parent = newThread._id;

                    newCategory.save();
                    newSubCategory.save();
                    newThread.save();
                    newPost.save();
                    newBoard.save().then(savedBoard => console.log(savedBoard.categories));
                });

    // newBoard
    //     .save()
    //     .then(savedBoard => callback(savedBoard))
    //     .catch(err => new Error(err));

            // createNewUser(
            //     { email: 'admin@example.com', isVerified: true, password: 'admin' },
            //     { userName: 'admin' },
            //     { isAdmin: true, isModerator: false, isMember: false }, (newUser) =>
            // {
            //     createNewBoard({ title: 'My Board', adminUser: newUser._id }, (newBoard) =>
            //     createNewCategory({ title: 'General Discussion', parent: newBoard._id}, (newCategory) =>
            //     createNewSubCategory({ title: 'Off-Topic Discussion', parent: newCategory._id}, () =>
            //     {
            //         console.log('New board created, you can log in via email: admin@example.com & password: admin');
            //     })));
            // });
        }
    });
};

export default initialSetup;
