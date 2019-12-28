import React from 'react';
import PropTypes from 'prop-types';
import { isNil } from 'lodash';

import { InputDebounced, Modal, Button } from 'shared/components';

import { SectionTitle } from '../Styles';
import {
  TrackingLink,
  Tracking,
  WatchIcon,
  Right,
  BarCont,
  Bar,
  Values,
  ModalContents,
  ModalTitle,
  Inputs,
  InputCont,
  InputLabel,
  Actions,
} from './Styles';

const propTypes = {
  issue: PropTypes.object.isRequired,
  updateIssue: PropTypes.func.isRequired,
};

const ProjectBoardIssueDetailsTracking = ({ issue, updateIssue }) => {
  const renderHourInput = fieldName => (
    <InputDebounced
      placeholder="Number"
      filter={/^\d{0,6}$/}
      value={isNil(issue[fieldName]) ? '' : issue[fieldName]}
      onChange={stringValue => {
        const value = stringValue.trim() ? Number(stringValue) : null;
        updateIssue({ [fieldName]: value });
      }}
    />
  );

  const renderEstimate = () => (
    <>
      <SectionTitle>Original Estimate (hours)</SectionTitle>
      {renderHourInput('estimate')}
    </>
  );

  const renderTracking = () => (
    <>
      <SectionTitle>Time Tracking</SectionTitle>
      <Modal
        width={400}
        renderLink={modal => (
          <TrackingLink onClick={modal.open}>{renderTrackingWidget()}</TrackingLink>
        )}
        renderContent={modal => (
          <ModalContents>
            <ModalTitle>Time tracking</ModalTitle>
            {renderTrackingWidget()}
            <Inputs>
              <InputCont>
                <InputLabel>Time spent (hours)</InputLabel>
                {renderHourInput('timeSpent')}
              </InputCont>
              <InputCont>
                <InputLabel>Time remaining (hours)</InputLabel>
                {renderHourInput('timeRemaining')}
              </InputCont>
            </Inputs>
            <Actions>
              <Button variant="primary" onClick={modal.close}>
                Done
              </Button>
            </Actions>
          </ModalContents>
        )}
      />
    </>
  );

  const renderTrackingWidget = () => (
    <Tracking>
      <WatchIcon type="stopwatch" size={26} top={-1} />
      <Right>
        <BarCont>
          <Bar width={calculateTrackingBarWidth(issue)} />
        </BarCont>
        <Values>
          <div>{issue.timeSpent ? `${issue.timeSpent}h logged` : 'No time logged'}</div>
          {renderRemainingOrEstimate(issue)}
        </Values>
      </Right>
    </Tracking>
  );

  return (
    <>
      {renderEstimate()}
      {renderTracking()}
    </>
  );
};

const calculateTrackingBarWidth = ({ timeSpent, timeRemaining, estimate }) => {
  if (!timeSpent) {
    return 0;
  }
  if (isNil(timeRemaining) && isNil(estimate)) {
    return 100;
  }
  if (!isNil(timeRemaining)) {
    return (timeSpent / (timeSpent + timeRemaining)) * 100;
  }
  if (!isNil(estimate)) {
    return Math.min((timeSpent / estimate) * 100, 100);
  }
};

const renderRemainingOrEstimate = ({ timeRemaining, estimate }) => {
  if (isNil(timeRemaining) && isNil(estimate)) {
    return null;
  }
  if (!isNil(timeRemaining)) {
    return <div>{`${timeRemaining}h remaining`}</div>;
  }
  if (!isNil(estimate)) {
    return <div>{`${estimate}h estimated`}</div>;
  }
};

ProjectBoardIssueDetailsTracking.propTypes = propTypes;

export default ProjectBoardIssueDetailsTracking;
