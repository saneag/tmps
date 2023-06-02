import React from 'react';
import { Components } from 'components';

const Home = () => {
    return (
        <div className="my-4">
            <Components.PostList
                children={
                    <div className="flex justify-center">
                        <Components.AddPost />
                    </div>
                }
            />
        </div>
    );
};

export default Home;
