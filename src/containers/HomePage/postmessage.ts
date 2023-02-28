import { createPostMessage } from '@app/utils/functions/createPostMessage';

interface EmitMessage {
  '@sections': {
    sections: any[];
  };
  '@draggingId': string | undefined;
}

interface OnMessage {}

export const pmPopup = createPostMessage<EmitMessage, OnMessage>({
  is: 'parent',
  iframeSelector: '#iframe-section',
});

export const pmIframe = createPostMessage<OnMessage, EmitMessage>({
  is: 'children',
});
