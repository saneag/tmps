import React from 'react';
import { Components } from 'components';

const Home = () => {
    return (
        <div className="my-4 grid grid-cols-1 px-4 lg:container md:grid-cols-4">
            <Components.PostList
                children={
                    <div className="flex justify-center">
                        <Components.AddPost />
                    </div>
                }
            />
            <Components.UsersList />
        </div>
    );
};

export default Home;
