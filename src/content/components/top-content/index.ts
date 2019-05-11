import CommonComponent from '../common';
import FollowController from './follow-controller';
import * as consoleFrames from '../../console-frames';
import * as messages from '../../../shared/messages';
import MessageListener from '../../MessageListener';
import AddonEnabledUseCase from '../../usecases/AddonEnabledUseCase';
import { ScrollPresenterImpl } from '../../presenters/ScrollPresenter';

let addonEnabledUseCase = new AddonEnabledUseCase();
let scrollPresenter = new ScrollPresenterImpl();

export default class TopContent {
  private win: Window;

  constructor(win: Window, store: any) {
    this.win = win;

    new CommonComponent(win, store); // eslint-disable-line no-new
    new FollowController(win, store); // eslint-disable-line no-new

    // TODO make component
    consoleFrames.initialize(this.win.document);

    new MessageListener().onWebMessage(this.onWebMessage.bind(this));
    new MessageListener().onBackgroundMessage(
      this.onBackgroundMessage.bind(this));
  }

  onWebMessage(message: messages.Message) {
    switch (message.type) {
    case messages.CONSOLE_UNFOCUS:
      this.win.focus();
      consoleFrames.blur(window.document);
    }
  }

  onBackgroundMessage(message: messages.Message) {
    let addonEnabled = addonEnabledUseCase.getEnabled();

    switch (message.type) {
    case messages.ADDON_ENABLED_QUERY:
      return Promise.resolve(addonEnabled);
    case messages.TAB_SCROLL_TO:
      return scrollPresenter.scrollTo(message.x, message.y, false);
    }
  }
}
