import React, { Component } from 'react';
import { Editor, getEventRange, getEventTransfer } from 'slate-react';
import { Value, Block } from 'slate';
import styled from 'react-emotion';
import Video from '../components/video';
import {Button, Icon, Menu, Toolbar} from '../components/components';


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
const existingValue = JSON.parse(localStorage.getItem('content'));
const titleValue = JSON.parse(localStorage.getItem('contentTitle'));
const initialValue = Value.fromJSON(
  existingValue||
  {
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

function onClickMark(event, type) {
  const { editor } = this.props
  event.preventDefault()
  editor.toggleMark(type)
}


class Profile extends Component {
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

  constructor(props){
    super(props);
    this.state = {
      value: initialValue,
    }
  }

  render() {
    return (
      <div className="">
      <Editor
        ref={this.ref}
        schema={schema}
        renderNode={this.renderNode}
        plugins={plugins}
        value={this.state.value}
        renderMark={this.renderMark}
        readOnly
      />
      </div>
    );
  }

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

}

export default Profile;
