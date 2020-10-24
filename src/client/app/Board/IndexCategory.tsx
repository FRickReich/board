import React, { useState } from 'react';

import { IndexSubCategory } from './IndexSubCategory';

const IndexCategory = ({ data }) =>
{
    return(
        <div className="Category">
            <a>{ data.title }</a>
            <div>
                    {
                        data.subCategories &&
                        data.subCategories.map((subCategory, j: number) =>
                        {
                            return(
                                <IndexSubCategory data={subCategory} />
                            );
                        })
                    }
            </div>
        </div>
    );
};

export { IndexCategory };
