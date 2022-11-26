import BrowserOnly from '@docusaurus/BrowserOnly';
import React, { useEffect, useState } from 'react';

import StarIcon from './star.svg';

let globalstars = ''

export const GithubStars = () => {
  const [star, setStar] = useState(globalstars);
  useEffect(() => {
    if (!globalstars) {
      fetch('https://api.github.com/repos/XCharts-Team/XCharts')
      .then((response) => response.json())
      .then((data) => {
        let stars;
        if (data.stargazers_count) {
          stars = (data.stargazers_count / 1000).toFixed(1) + ' k';
        } else {
          stars = '2.3k';
        }
        globalstars = stars
        setStar(stars);
      });
    }
  }, []);

  return (
    <a
      href="https://github.com/XCharts-Team/XCharts"
      target="_blank"
      className="hover:no-underline"
    >
      <div className="flex border border-grey-3 bg-grey-0 text-grey-4 rounded-sm text-caption">
        <div className="p-1 px-2 bg-grey-2 flex items-center">
          <StarIcon height={16} width={16} />
          <span className='ml-1'>GitHub Star</span>
        </div>
        <div className='p-1 px-2'>{star}</div>
      </div>
    </a>
  );
};
