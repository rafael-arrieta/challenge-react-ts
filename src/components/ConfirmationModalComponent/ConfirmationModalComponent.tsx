import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface ConfirmationModalProps {
    show: boolean;
    onHide: () => void;
    onConfirm: () => void;
    productMake: string;
}

const ConfirmationModalComponent: React.FC<ConfirmationModalProps> = ({ show, onHide, onConfirm, productMake }) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmar Eliminación</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                ¿Estás seguro de eliminar el producto {productMake}?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancelar
                </Button>
                <Button variant="danger" onClick={onConfirm}>
                    Eliminar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmationModalComponent;