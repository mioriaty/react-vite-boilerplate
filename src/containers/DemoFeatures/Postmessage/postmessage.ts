import { createPostMessage } from '@app/utils/functions/createPostMessage';

interface ParentEmitMessage {
  '@sections': {
    sections: any[];
  };
  '@draggingId': string | undefined;
  '@clicked'?: boolean;
}

interface ParentOnMessage {
  '@iframeReady': boolean;
  getClickedSuccess?: undefined;
}

interface ChildEmitMessage extends ParentOnMessage {}
interface ChildOnMessage extends ParentEmitMessage {}

export const pmPopup = createPostMessage<ParentEmitMessage, ParentOnMessage>({
  is: 'parent',
  iframeSelector: '#iframe-section',
});

export const pmIframe = createPostMessage<ChildEmitMessage, ChildOnMessage>({
  is: 'children',
});
