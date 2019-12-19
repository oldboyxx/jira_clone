import React from 'react';
import ContentLoader from 'react-content-loader';

const IssueDetailsLoader = () => (
  <div style={{ padding: 40 }}>
    <ContentLoader
      height={260}
      width={940}
      speed={2}
      primaryColor="#f3f3f3"
      secondaryColor="#ecebeb"
    >
      <rect x="0" y="0" rx="3" ry="3" width="627" height="24" />
      <rect x="0" y="29" rx="3" ry="3" width="506" height="24" />
      <rect x="0" y="77" rx="3" ry="3" width="590" height="16" />
      <rect x="0" y="100" rx="3" ry="3" width="627" height="16" />
      <rect x="0" y="123" rx="3" ry="3" width="480" height="16" />
      <rect x="0" y="187" rx="3" ry="3" width="370" height="16" />
      <circle cx="18" cy="239" r="18" />
      <rect x="46" y="217" rx="3" ry="3" width="548" height="42" />
      <rect x="683" y="3" rx="3" ry="3" width="135" height="14" />
      <rect x="683" y="33" rx="3" ry="3" width="251" height="24" />
      <rect x="683" y="90" rx="3" ry="3" width="135" height="14" />
      <rect x="683" y="120" rx="3" ry="3" width="251" height="24" />
      <rect x="683" y="177" rx="3" ry="3" width="135" height="14" />
      <rect x="683" y="207" rx="3" ry="3" width="251" height="24" />
    </ContentLoader>
  </div>
);

export default IssueDetailsLoader;
