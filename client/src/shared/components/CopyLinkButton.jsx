import React, { useState } from 'react';

import { copyToClipboard } from 'shared/utils/clipboard';
import { Button } from 'shared/components';

const CopyLinkButton = ({ ...otherProps }) => {
  const [isLinkCopied, setLinkCopied] = useState(false);

  const handleLinkCopy = () => {
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
    copyToClipboard(window.location.href);
  };
  return (
    <Button icon="link" onClick={handleLinkCopy} {...otherProps}>
      {isLinkCopied ? 'Link Copied' : 'Copy link'}
    </Button>
  );
};

export default CopyLinkButton;
