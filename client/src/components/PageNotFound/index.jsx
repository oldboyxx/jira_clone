import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  Button,
  ConfirmModal,
  Avatar,
  DatePicker,
  Input,
  Modal,
  Select,
  Textarea,
  Spinner,
} from 'shared/components';
import { Wrapper, Heading, Message } from './Styles';

const PageNotFound = () => {
  const [dateValue, setDateValue] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectValue, setSelectValue] = useState('');
  const [selectOptions, setSelectOptions] = useState([
    { label: 'one', value: '1' },
    { label: 'two', value: '2' },
    { label: 'three', value: '3' },
    { label: 'four', value: '4' },
    { label: 'five', value: '5' },
    { label: 'six', value: '6' },
    { label: 'seven', value: '7' },
    { label: 'eight', value: '8' },
    { label: 'nine', value: '9' },
    { label: 'ten', value: '10' },
  ]);
  console.log('ha');
  return (
    <Wrapper>
      <Heading>404</Heading>
      <Message>We cannot find the page you are looking for.</Message>
      <div style={{ textAlign: 'left' }}>
        <Avatar name="Ivor Reic" size={40} />
        <ConfirmModal
          renderLink={modal => <Button onClick={modal.open}>Yo</Button>}
          confirmInput="YAY"
          onConfirm={modal => {
            console.log('CONFIRMED!');
            modal.close();
          }}
        />
        <DatePicker placeholder="Select date" value={dateValue} onChange={setDateValue} />
        <Input
          placeholder="Write anything mon"
          value={inputValue}
          onChange={(event, value) => setInputValue(value)}
        />
        <Textarea
          placeholder="Write anything mon"
          value={inputValue}
          onChange={(event, value) => setInputValue(value)}
        />
        <Button onClick={() => setModalOpen(true)}>OPEN MODAL CONTROLLED</Button>
        <Modal
          // renderLink={modal => <Button onClick={modal.open}>OPEN MODAL</Button>}
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          renderContent={modal => (
            <>
              <h1>Nice modal bro</h1>
              <h1>Nice modal bro</h1>
              <Button onClick={modal.close}>Close</Button>
              <Modal
                renderLink={innerModal => <Button onClick={innerModal.open}>Open Modal</Button>}
                renderContent={innerModal => (
                  <>
                    <h1>Nice innerModal bro</h1>
                    <Button onClick={innerModal.close}>Close</Button>
                  </>
                )}
              />
            </>
          )}
        />
        <Select
          isMulti
          value={selectValue}
          onChange={setSelectValue}
          placeholder="Type to search"
          onCreate={(newOptionName, selectOptionValue) => {
            setTimeout(() => {
              setSelectOptions([...selectOptions, { label: newOptionName, value: newOptionName }]);
              selectOptionValue(newOptionName);
            }, 1000);
          }}
          options={selectOptions}
        />
        <Spinner />
      </div>
      <Link to="/">
        <Button>Home</Button>
      </Link>
    </Wrapper>
  );
};

export default PageNotFound;
