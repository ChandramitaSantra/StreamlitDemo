import React, { useState } from 'react';
import { Button, Modal } from 'antd';
const SwitchToggle = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Generative AI
      </Button>
      <Modal title="Generative AI" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Enkrypt AI's Sentry suite is a comprehensive and cutting-edge solution designed to enable secure, responsible, and compliant generative AI adoption within enterprises. As organizations increasingly leverage the transformative power of large language models (LLMs), the Sentry suite provides a robust control layer, ensuring seamless alignment with enterprise standards for privacy, security, and compliance.</p>
      </Modal>
    </>
  );
};
export default SwitchToggle;