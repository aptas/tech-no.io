/*
 * This file is part of the tech-no.io application.
 *
 * (c) Magnus Bergman <hello@magnus.sexy>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import Inferno from 'inferno';
import Component from 'inferno-component';
import classNames from 'classnames';

import styles from './form.scss';

/**
 * This is the Form component.
 */
export default class Form extends Component {

  /**
   * Create Form.
   *
   * @param {Object} props
   *
   * @return {void}
   */
  constructor(props) {
    super(props);

    this.state = {
		  sending: false,
		  focus: false,
		  error: null,
		  valid: false,
		  value: '',
		  response: null,
		};

    this.locked = false;
  }

  /**
   * Focus event handler.
   *
   * @return {void}
   */
  onFocus = () => {
    this.setState({ focus: true });
  }

  /**
   * Blur event handler.
   *
   * @return {void}
   */
  onBlur = () => {
    this.setState({ focus: false });
  }

  /**
   * Change event handler.
   *
   * @param  {Object} event
   *
   * @return {void}
   */
  onInput = (event) => {
    const { value } = event.currentTarget;

    const status = this.validate(value);

    this.setState({
      value,
      ...status,
    });
  }

  /**
   * Submit event handler.
   *
   * @param  {Object} event
   *
   * @return {void}
   */
  onSubmit = (event) => {
    if (event && typeof event.preventDefault === 'function') event.preventDefault();
    if (event && typeof event.stopPropagation === 'function') event.stopPropagation();

    const { value, sending } = this.state;

    const status = this.validate(value);

    this.setState({
      ...status,
    });

    if (!status.valid || status.error || sending || this.locked) return;

    this.request();
  }

  /**
   * Validate input.
   *
   * @param  {string} value
   *
   * @return {{ valid: boolean, error: string }}
   */
  validate = (value) => {
    const val = typeof value === 'string' ? value.trim() : value;

    if (!val) {
      return {
        error: 'E-post er påkrevd.',
        valid: false,
      };
    }

    if (!/.+@.+/.test(val)) {
      return {
        error: 'Ikke en gyldig e-post.',
        valid: false,
      };
    }

    return {
      error: null,
      valid: true,
    };
  }

  /**
   * Create and send fetch request through formspree for simple mail passthrough.
   *
   * @return {void}
   */
  request() {
    const { value } = this.state;

    this.locked = true;

    const request = {
      method: 'POST',
      credentials: 'same-origin',
      headers: new Headers(),
    };

    request.headers.append('X-Requested-With', 'XMLHttpRequest');
    request.headers.append('Content-Type', 'application/json');
    request.headers.append('Accept', 'application/json');

    request.body = JSON.stringify({
      message: `New request from: ${value}`,
    });

    this.setState({ sending: true });

    fetch('https://formspree.io/invites@tech-no.io', request)
      .then(response => response.json())
      .then((json) => {
        const { success } = json;

				let nextState = {
				  error: null,
				  valid: false,
				  value: '',
				};

        if (success) {
          nextState = {
						...nextState,
            response: `Vi har mottatt din forespørsel og sender en invitasjon til "${value}" innen kort tid.`,
            sending: false,
          };
        } else {
          nextState = {
						...nextState,
            error: 'Noe gikk galt. Send en e-post til invites@tech-no.io så inviterer vi deg.',
            sending: false,
          };
        }

				this.setState(nextState);

        this.locked = false;
      })
      .catch(err => Promise.reject(err));
  }

  /**
   * Render Form.
   *
   * @return {Object}
   */
  render() {
    const { valid, sending, value, focus, error, response } = this.state;

    return (
      <section>
        <p className={styles.silent}>Oppgi din e-post for å få en invite!</p>
        <form
          className={classNames(styles.form, { [styles.invalid]: !valid, [styles.sending]: sending })}
          onSubmit={this.onSubmit}
          noValidate
          autoComplete="off"
        >
          <label className={classNames({ [styles.dirty]: focus || Boolean(value) })}>
            <span>e-post</span>
            <input
              type="text"
              name="email"
              value={value}
              onInput={this.onInput}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
            />
          </label>
          {error && !focus && <span className={styles.error}>{error}</span>}
          {response && <p className={styles.response} dangerouslySetInnerHTML={{ __html: response }} />}
          <button type="submit">Send</button>
        </form>
      </section>
    );
  }
}
