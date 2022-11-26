/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useCallback, useState, useEffect, useMemo } from 'react';
import Translate from '@docusaurus/Translate';
import Toggle from '@theme/Toggle';
import {
  useThemeConfig,
  useColorMode,
  useLockBodyScroll,
} from '@docusaurus/theme-common';

import useMobileSidebar from '../../utils/useMobile';

import ArrowRightIcon from '../icons/arrow-right.svg';

import WebchatImg from '../icons/wechat-community.jpg'

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import AsyncImage from '@theme/AsyncImage'

import {
  CollapseDropDown,
  DropdownNavbarItem,
  LocaleDropdownNavbarItem,
  SimpleDropdown,
  VersionDropdownNavbarItem,
} from './DropdownNavbarItem';

import clsx from 'clsx';

import { GithubStars } from './githubStar';

import MenuIcon from './menu.svg';
import LogoIcon from './logo.svg';
import CloseIcon from './x.svg';
import { NavLink, WithLocalLink, WithVersionLink } from './WithVersionUrl';
import { translate } from '@docusaurus/Translate';
import { useLocation } from '@docusaurus/router';

const resources = [
  {
    label: translate({
      id: 'theme.text.blog',
      message: 'Blogs',
    }),
    href: '/blog',
  },
  // {
  //   label: translate({
  //     id: 'theme.text.newsletters',
  //     message: 'Newsletters',
  //   }),
  //   href: '/newsletter',
  // }
];

const communities = [
  // {
  //   label: translate({
  //     id: 'theme.text.wechat',
  //     message: 'Wechat',
  //   }),
  //   href: '',
  //   popover: <AsyncImage src={WebchatImg} />
  // },
  {
    label: translate({
      id: 'theme.text.globalforum',
      message: 'Global Forum',
    }),
    href: 'https://github.com/XCharts-Team/XCharts/discussions',
    // popover: <AsyncImage src={WebchatImg} />
  },,
  {
    label: translate({
      id: 'theme.text.qq',
      message: 'QQ Group: 202030963',
    }),
    href: '',
    // popover: <AsyncImage src={WebchatImg} />
  },
];

function useColorModeToggle() {
  const {
    colorMode: { disableSwitch },
  } = useThemeConfig();
  const { isDarkTheme, setLightTheme, setDarkTheme } = useColorMode();
  const toggle = useCallback(
    (e) => (e.target.checked ? setDarkTheme() : setLightTheme()),
    [setLightTheme, setDarkTheme]
  );
  return { isDarkTheme, toggle, disabled: disableSwitch };
}

type NavbarMobileSidebarProps = {
  sidebarShown: boolean;
  toggleSidebar: () => void;
};

function NavbarMobileSidebar({
  sidebarShown,
  toggleSidebar,
}: NavbarMobileSidebarProps) {
  useLockBodyScroll(sidebarShown);

  const colorModeToggle = useColorModeToggle();

  return (
    <div className="navbar-sidebar flex flex-col overflow-hidden">
      <div className="desktop:h-20 h-16 flex items-center px-3 border-b border-grey-3">
        <div className="flex items-center space-x-3">
          <a href="/">
            {/* <LogoIcon width={120} /> */}
            XCharts
          </a>
          <GithubStars />
        </div>
        <button
          type="button"
          className="clean-btn navbar-sidebar__close"
          onClick={toggleSidebar}
        >
          <CloseIcon />
        </button>
      </div>
      <div className="px-3 py-4 flex-1 overflow-hidden relative">
        <ul className="space-y-3 overflow-auto h-full">
          <li className="px-2 py-1">
            <WithLocalLink
              className="block"
              href="/docs/"
              label="Doc Home"
              matchPath="/docs"
            />
          </li>
          <li className="px-2 py-1">
            <WithVersionLink
              className="block"
              href="/api/"
              label="API"
              matchPath="/api"
            />
          </li>
          <CollapseDropDown label="Resource" items={resources} />
          <CollapseDropDown label="Community" items={communities} />
        </ul>
      </div>
      <div className="border-t py-3">
        <ul className="flex items-center justify-around space-x-3">
          <li className="flex-1">
            <VersionDropdownNavbarItem position="top" />
          </li>
          <li className="flex-1">
            <LocaleDropdownNavbarItem position="top" />
          </li>
          <li>
            <Toggle
              checked={colorModeToggle.isDarkTheme}
              onChange={colorModeToggle.toggle}
            />
          </li>
        </ul>
      </div>
    </div>
  );
}

function Navbar(props): JSX.Element {
  const colorModeToggle = useColorModeToggle();

  const mobileSidebar = useMobileSidebar();

  const { pathname } = useLocation();

  const {
    i18n: { defaultLocale, currentLocale },
  } = useDocusaurusContext();

  const resourceswithactive = resources.map((item) => {
    let matchpath = item.href
    if (defaultLocale !== currentLocale) matchpath = '/' + currentLocale + matchpath
    const active = pathname.startsWith(matchpath)
    return {...item, active }
  })

  return (
    <nav
      id="header-nav"
      className={clsx(
        'bg-grey-0 border-b border-grey-3 flex items-center justify-between sticky top-0 desktop:h-20 h-16 z-30 px-3 desktop:px-8',
        { 'navbar-sidebar--show': mobileSidebar.shown }
      )}
    >
      <div className="flex items-center space-x-5">
        <a href="/">
          {/* <LogoIcon /> */}
          <h1>XCharts</h1>
        </a>
        <div className="hidden desktop:inline-block">
          <GithubStars />
        </div>
      </div>
      <ul className="hidden desktop:flex items-center">
        <li className="pr-6 border-r navitem">
          <WithLocalLink
            href="/docs/"
            label={translate({
              id: 'theme.text.dochome',
              message: 'Doc Home',
            })}
            matchPath="/docs"
          />
        </li>
        <li className="px-6 border-r navitem">
          <NavLink href="https://xcharts-team.github.io/demo" label={translate({
              id: 'theme.text.onlinedemo',
              message: 'Online Demo',
            })}/>
        </li>
        <li className="px-6 border-r navitem">
          <SimpleDropdown
            labelNode={
              <div className="cursor-pointer hover:text-brand-cyan p-[6px]">
                {translate({
                  id: 'theme.text.resources',
                  message: 'Resources',
                })}
              </div>
            }
            description={
              <>
                <div className="pb-4">
                  {translate({
                    id: 'theme.navbar.resourceinfo',
                    message:
                      "Get inspired by XCharts's users stories, blogs, and Graphics courses.",
                  })}
                </div>
                <WithLocalLink
                  className="text-h4 flex justify-between items-center text-black hover:text-white"
                  href="/blog"
                  label={
                    <>
                      {translate({
                        id: 'theme.text.learnmore',
                        message: 'Learn more',
                      })}
                      <ArrowRightIcon />
                    </>
                  }
                />
                {/* <ArrowRightIcon /> */}
                {/* </h4> */}
              </>
            }
            label={translate({
              id: 'theme.text.resources',
              message: 'Resources',
            })}
            items={resourceswithactive}
          />
        </li>
        <li className="px-6 border-r">
          <SimpleDropdown
            labelNode={
              <div className="cursor-pointer hover:text-brand-cyan p-[6px]">
                {translate({
                  id: 'theme.text.community',
                  message: 'Community',
                })}
              </div>
            }
            description={
              <>
                <div className="pb-4">
                  {translate({
                    id: 'theme.navbar.communityinfo',
                    message: "Join XCharts's Community.",
                  })}
                </div>
                <a
                  href="https://github.com/XCharts-Team/XCharts"
                  className="text-h4 flex justify-between items-center text-black hover:text-white"
                >
                  {translate({
                    id: 'theme.text.learnmore',
                    message: 'Learn more',
                  })}
                  <ArrowRightIcon />
                </a>
              </>
            }
            label={translate({
              id: 'theme.text.community',
              message: 'Community',
            })}
            items={communities}
          />
        </li>
        <li className="ml-6">
          <VersionDropdownNavbarItem />
        </li>
        <li className="ml-6">
          <LocaleDropdownNavbarItem />
        </li>
        <li className="ml-6">
          <Toggle
            checked={colorModeToggle.isDarkTheme}
            onChange={colorModeToggle.toggle}
          />
        </li>
      </ul>
      <div
        className="inline-block desktop:hidden cursor-pointer"
        onClick={mobileSidebar.toggle}
      >
        <MenuIcon />
      </div>
      <div
        role="presentation"
        className="navbar-sidebar__backdrop"
        onClick={mobileSidebar.toggle}
      />
      {mobileSidebar.shouldRender && (
        <NavbarMobileSidebar
          sidebarShown={mobileSidebar.shown}
          toggleSidebar={mobileSidebar.toggle}
        />
      )}
    </nav>
  );
}

export default Navbar;
