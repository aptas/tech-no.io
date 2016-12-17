/*
 * This file is part of the tech-no.io application.
 *
 * (c) Magnus Bergman <hello@magnus.sexy>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import Inferno from 'inferno';

import Header from 'components/header/header';
import Form from 'components/form/form';

import './app.scss';

/**
 * This is the App component.
 */
const App = () =>
  <article>
    <Header />
    <Form />
  </article>;

export default App;
