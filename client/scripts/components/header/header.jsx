/*
 * This file is part of the tech-no.io application.
 *
 * (c) Magnus Bergman <hello@magnus.sexy>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import Inferno from 'inferno';

import Logo from 'components/logo/logo';

import './header.scss';

/**
 * This is the Header component.
 */
const Header = () =>
  <header>
    <Logo />
    <h2>Har du lyst til å bli en del av noe stort?</h2>
    <h1>tech-norway er en slack-gruppe hvor fagfolk og andre interesserte diskuterer alt innen teknologi og design.</h1>
  </header>;

export default Header;
