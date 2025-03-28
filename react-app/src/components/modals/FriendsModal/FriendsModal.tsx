import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useUserProfile } from '../../../hooks/useUserProfile';
import { Link, useLocation } from 'react-router-dom';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface ModalProps {
    open: boolean,
    onClose: () => void
}

export const FriendsModal: React.FC<ModalProps> = ({ open, onClose }) => {
    const {
        friendRequestsCount,
        requestSenders,
        displayUser
    } = useUserProfile();


    return (
        <>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-description" component="div" sx={{ mt: 2 }}>
                        {requestSenders.length > 0 ? (
                            <ul>
                                {requestSenders.map((sender) => (
                                    <li key={sender.id}><Link
                                        to={{ pathname: `/${sender.username}` }}

                                    >{sender.username}</Link> <button>Accept</button><button>Reject</button></li>
                                ))}
                            </ul>)
                            :
                            'Новых запросов нет'
                        }
                    </Typography>
                </Box>
            </Modal>
        </>
    )
}
