import { Editor, getEventRange, getEventTransfer } from 'slate-react';
import { Value, Block } from 'slate';
import isImageUrl from 'is-image-url';
import isUrl from 'is-url';
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'react-emotion';
import Video from '../components/video';
import {Button, Icon, Menu, Toolbar} from '../components/components';

/**
 * Give the menu some styles.
 *
 * @type {Component}
 */

const StyledMenu = styled(Menu)`
  padding: 8px 7px 6px;
  position: absolute;
  z-index: 1;
  top: -10000px;
  left: -10000px;
  margin-top: -6px;
  opacity: 0;
  background-color: #222;
  border-radius: 4px;
  transition: opacity 0.75s;
`

const Image = styled('img')`
  display: block;
  max-width: 100%;
  max-height: 20em;
  box-shadow: ${props => (props.selected ? '0 0 0 2px blue;' : 'none')};
`

const initialValue = Value.fromJSON({
  document:{
    nodes:[
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: '',
              }
            ]
          }
        ]
      }
    ]
  }
});

const plugins = [
  MarkHotKey({key: 'b', type: 'bold'}),
  MarkHotKey({key: 'i', type: 'italic'}),
  MarkHotKey({key: 'u', type: 'underlined'}),
  MarkHotKey({key: 's', type: 'strikethrough'}),
]

function insertImage(editor, src, target) {
  if (target) {
    editor.select(target)
  }

  editor.insertBlock({
    type: 'image',
    data: { src },
  })
}

const schema = {
  document: {
    last: { type: 'paragraph' },
    normalize: (editor, { code, node, child }) => {
      switch (code) {
        case 'last_child_type_invalid': {
          const paragraph = Block.create('paragraph')
          return editor.insertNodeByKey(node.key, node.nodes.size, paragraph)
        }
      }
    },
  },
  blocks: {
    image: {
      isVoid: true,
    },
    video: {
      isVoid: true,
    },
  },
}

function MarkHotKey(options) {
  const {key, type} = options;
  return {
    onKeyDown(e,editor,next) {
      if(!e.metaKey || e.key != key){
        return next();
      }
      e.preventDefault();
      editor.toggleMark(type);
    },
  }
}

/**
 * The hovering menu.
 *
 * @type {Component}
 */

class HoverMenu extends React.Component {
  /**
   * Render.
   *
   * @return {Element}
   */

  render() {
    const { className, innerRef } = this.props
    const root = window.document.getElementById('root')

    return ReactDOM.createPortal(
      <StyledMenu className={className} innerRef={innerRef}>
        {this.renderMarkButton('bold', 'format_bold')}
        {this.renderMarkButton('italic', 'format_italic')}
        {this.renderMarkButton('underlined', 'format_underlined')}
        {this.renderMarkButton('code', 'code')}
      </StyledMenu>,
      root
    )
  }

  /**
   * Render a mark-toggling toolbar button.
   *
   * @param {String} type
   * @param {String} icon
   * @return {Element}
   */

  renderMarkButton(type, icon) {
    const { editor } = this.props
    const { value } = editor
    const isActive = value.activeMarks.some(mark => mark.type == type)
    return (
      <Button
        reversed
        active={isActive}
        onMouseDown={event => this.onClickMark(event, type)}
      >
        <Icon>{icon}</Icon>
      </Button>
    )
  }

  /**
   * When a mark button is clicked, toggle the current mark.
   *
   * @param {Event} event
   * @param {String} type
   */

  onClickMark(event, type) {
    const { editor } = this.props
    event.preventDefault()
    editor.toggleMark(type)
  }
}

/**
 * The hovering menu example.
 *
 * @type {Component}
 */

class HoveringMenu extends React.Component {

  ref = editor => {
    this.editor = editor
  }

  getType = chars => {
    switch (chars) {
      case '*':
      case '-':
      case '+':
        return 'list-item'
      case '>':
        return 'block-quote'
      case '#':
        return 'heading-one'
      case '##':
        return 'heading-two'
      case '###':
        return 'heading-three'
      case '####':
        return 'heading-four'
      case '#####':
        return 'heading-five'
      case '######':
        return 'heading-six'
      default:
        return null
    }
  }

  /**
   * Deserialize the raw initial value.
   *
   * @type {Object}
   */
   constructor(props){
     super(props);
     this.state = {
       value: initialValue,
     }
   }

  /**
   * On update, update the menu.
   */

  componentDidMount = () => {
    this.updateMenu()
  }

  componentDidUpdate = () => {
    this.updateMenu()
  }

  /**
   * Update the menu's absolute position.
   */

  updateMenu = () => {
    const menu = this.menu
    if (!menu) return

    const { value } = this.state
    const { fragment, selection } = value

    if (selection.isBlurred || selection.isCollapsed || fragment.text === '') {
      menu.removeAttribute('style')
      return
    }

    const native = window.getSelection()
    const range = native.getRangeAt(0)
    const rect = range.getBoundingClientRect()
    menu.style.opacity = 1
    menu.style.top = `${rect.top + window.pageYOffset - menu.offsetHeight}px`

    menu.style.left = `${rect.left +
      window.pageXOffset -
      menu.offsetWidth / 2 +
      rect.width / 2}px`
  }

  /**
   * Render.
   *
   * @return {Element}
   */

  render() {
    return (
      <div className='type_block'>
      <Toolbar>
          <Button onMouseDown={this.onClickImage}>
            <Icon>image</Icon>
          </Button>
        </Toolbar>
        <Editor
          ref={this.ref}
          schema={schema}
          onDrop={this.onDropOrPaste}
          onPaste={this.onDropOrPaste}
          renderNode={this.renderNode}
          plugins={plugins}
          onKeyDown={this.onKeyDown}
          placeholder="Enter some text..."
          value={this.state.value}
          onChange={this.onChange}
          renderEditor={this.renderEditor}
          renderMark={this.renderMark}
        />
      </div>
    )
  }

  /**
   * Render the editor.
   *
   * @param {Object} props
   * @param {Function} next
   * @return {Element}
   */

  renderEditor = (props, editor, next) => {
    const children = next()
    return (
      <React.Fragment>
        {children}
        <HoverMenu innerRef={menu => (this.menu = menu)} editor={editor} />
      </React.Fragment>
    )
  }

  /**
   * Render a Slate mark.
   *
   * @param {Object} props
   * @param {Editor} editor
   * @param {Function} next
   * @return {Element}
   */

  renderMark = (props, editor, next) => {
    const { children, mark, attributes } = props

    switch (mark.type) {
      case 'bold':
        return <strong {...attributes}>{children}</strong>
      case 'code':
        return <code {...attributes}>{children}</code>
      case 'italic':
        return <em {...attributes}>{children}</em>
      case 'underlined':
        return <u {...attributes}>{children}</u>
      default:
        return next()
    }
  }

  renderNode = (props, editor, next) => {
    const { attributes, children, node, isFocused } = props

    switch (node.type) {
      case 'image': {
        const src = node.data.get('src')
        return <Image src={src} selected={isFocused} {...attributes} />
      }

      case 'video':{
        return <Video {...props} />;
      }

      case 'block-quote':
        return <blockquote {...attributes}>{children}</blockquote>
      case 'bulleted-list':
        return <ul {...attributes}>{children}</ul>
      case 'heading-one':
        return <h1 {...attributes}>{children}</h1>
      case 'heading-two':
        return <h2 {...attributes}>{children}</h2>
      case 'heading-three':
        return <h3 {...attributes}>{children}</h3>
      case 'heading-four':
        return <h4 {...attributes}>{children}</h4>
      case 'heading-five':
        return <h5 {...attributes}>{children}</h5>
      case 'heading-six':
        return <h6 {...attributes}>{children}</h6>
      case 'list-item':
        return <li {...attributes}>{children}</li>

      default: {
        return next()
      }
    }
  }

  onClickImage = event => {
    event.preventDefault()
    const src = window.prompt('Enter the URL of the image:')
    if (!src) return
    this.editor.command(insertImage, src)
  }

  onKeyDown = (event, editor, next) => {
    switch (event.key) {
      case ' ':
        return this.onSpace(event, editor, next)
      case 'Backspace':
        return this.onBackspace(event, editor, next)
      case 'Enter':
        return this.onEnter(event, editor, next)
      default:
        return next()
    }
  }

  onSpace = (event, editor, next) => {
    const { value } = editor
    const { selection } = value
    if (selection.isExpanded) return next()

    const { startBlock } = value
    const { start } = selection
    const chars = startBlock.text.slice(0, start.offset).replace(/\s*/g, '')
    const type = this.getType(chars)
    if (!type) return next()
    if (type == 'list-item' && startBlock.type == 'list-item') return next()
    event.preventDefault()

    editor.setBlocks(type)

    if (type == 'list-item') {
      editor.wrapBlock('bulleted-list')
    }

    editor.moveFocusToStartOfNode(startBlock).delete()
  }

  onBackspace = (event, editor, next) => {
    const { value } = editor
    const { selection } = value
    if (selection.isExpanded) return next()
    if (selection.start.offset != 0) return next()

    const { startBlock } = value
    if (startBlock.type == 'paragraph') return next()

    event.preventDefault()
    editor.setBlocks('paragraph')

    if (startBlock.type == 'list-item') {
      editor.unwrapBlock('bulleted-list')
    }
  }

  onEnter = (event, editor, next) => {
    const { value } = editor
    const { selection } = value
    const { start, end, isExpanded } = selection
    if (isExpanded) return next()

    const { startBlock } = value
    if (start.offset == 0 && startBlock.text.length == 0)
      return this.onBackspace(event, editor, next)
    if (end.offset != startBlock.text.length) return next()

    if (
      startBlock.type != 'heading-one' &&
      startBlock.type != 'heading-two' &&
      startBlock.type != 'heading-three' &&
      startBlock.type != 'heading-four' &&
      startBlock.type != 'heading-five' &&
      startBlock.type != 'heading-six' &&
      startBlock.type != 'block-quote'
    ) {
      return next()
    }

    event.preventDefault()
    editor.splitBlock().setBlocks('paragraph')
  }


  onDropOrPaste = (event, editor, next) => {
    const target = getEventRange(event, editor);
    if (!target && event.type === 'drop'){
      return next();
    }

    const transfer = getEventTransfer(event)
    const { type, text, files } = transfer
    if (type === 'files') {
      for (const file of files) {
        const reader = new FileReader()
        const [mime] = file.type.split('/')
        if (mime !== 'image') continue

        reader.addEventListener('load', () => {
          editor.command(insertImage, reader.result, target)
        })

        reader.readAsDataURL(file)
      }
      return
    }

    if (type === 'text') {
      console.log(isUrl);
      if (!isUrl(text)) return next()
      if (!isImageUrl(text)) return next()
      editor.command(insertImage, text, target)
      return
    }

    next()
  }

  /**
   * On change.
   *
   * @param {Editor} editor
   */

  onChange = ({ value }) => {
    this.setState({ value })
  }
}

/**
 * Export.
 */

export default HoveringMenu;
