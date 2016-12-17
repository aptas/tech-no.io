/*
 * This file is part of the tech-no.io application.
 *
 * (c) Magnus Bergman <hello@magnus.sexy>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import Inferno, { render } from 'inferno';

import 'whatwg-fetch';
import p from 'promise-polyfill';

import 'social.png';

import App from 'components/app/app';

if (!window.Promise) {
  window.Promise = p;
}

render(<App />, document.getElementById('root'));
