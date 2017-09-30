export default class Completion {
  constructor(wrapper, store) {
    this.wrapper = wrapper;
    this.store = store;
  }

  update() {
    let state = this.store.getState();

    this.wrapper.innerHTML = '';

    for (let i = 0; i < state.groups.length; ++i) {
      let group = state.groups[i];
      let title = this.createCompletionTitle(group.name);
      this.wrapper.append(title);

      for (let j = 0; j < group.items.length; ++j) {
        let item = group.items[j];
        let li = this.createCompletionItem(item.icon, item.caption, item.url);
        this.wrapper.append(li);

        if (i === state.groupSelection && j === state.itemSelection) {
          li.classList.add('vimvixen-completion-selected');
        }
      }
    }
  }

  createCompletionTitle(text) {
    let doc = this.wrapper.ownerDocument;
    let li = doc.createElement('li');
    li.className = 'vimvixen-console-completion-title';
    li.textContent = text;
    return li;
  }

  createCompletionItem(icon, caption, url) {
    let doc = this.wrapper.ownerDocument;

    let captionEle = doc.createElement('span');
    captionEle.className = 'vimvixen-console-completion-item-caption';
    captionEle.textContent = caption;

    let urlEle = doc.createElement('span');
    urlEle.className = 'vimvixen-console-completion-item-url';
    urlEle.textContent = url;

    let li = doc.createElement('li');
    li.style.backgroundImage = 'url(' + icon + ')';
    li.className = 'vimvixen-console-completion-item';
    li.append(captionEle);
    li.append(urlEle);
    return li;
  }
}
