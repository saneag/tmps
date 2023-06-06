import React from 'react';

import { Components } from 'components';

const MyPosts = () => {
    return (
        <div className="container my-4 flex justify-center px-4">
            <Components.PostList className="md:w-8/12" />
        </div>
    );
};

export default MyPosts;
