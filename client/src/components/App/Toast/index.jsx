import React, { Component } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import pubsub from 'sweet-pubsub';
import { uniqueId } from 'lodash';

import { Icon } from 'shared/components';
import { Container, StyledToast, Title, Message } from './Styles';

class Toast extends Component {
  state = { toasts: [] };

  componentDidMount() {
    pubsub.on('toast', this.addToast);
  }

  componentWillUnmount() {
    pubsub.off('toast', this.addToast);
  }

  addToast = ({ type = 'success', title, message, duration = 5 }) => {
    const id = uniqueId('toast-');

    this.setState(state => ({
      toasts: [...state.toasts, { id, type, title, message }],
    }));

    if (duration) {
      setTimeout(() => this.removeToast(id), duration * 1000);
    }
  };

  removeToast = id => {
    this.setState(state => ({
      toasts: state.toasts.filter(toast => toast.id !== id),
    }));
  };

  render() {
    const { toasts } = this.state;
    return (
      <Container>
        <TransitionGroup>
          {toasts.map(toast => (
            <CSSTransition key={toast.id} classNames="jira-toast" timeout={200}>
              <StyledToast
                key={toast.id}
                type={toast.type}
                onClick={() => this.removeToast(toast.id)}
              >
                <Icon type="close" />
                {toast.title && <Title>{toast.title}</Title>}
                {toast.message && <Message>{toast.message}</Message>}
              </StyledToast>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </Container>
    );
  }
}

export default Toast;
