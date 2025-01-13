import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import { grey } from '@mui/material/colors';
interface Props {
    children: string;
}
const CustomButtonBlack = ({ children }: Props) => {

    const ColorButton = styled(Button)<ButtonProps>(() => ({
        color: '#7c7c7c',
        textTransform: 'lowercase',
        fontWeight: '700',
        backgroundColor: 'transparent',
        border: '2px solid',
        borderRadius: '0.4rem',
        borderColor: grey[500],
        boxShadow: 'none',
        fontFamily: 'Poppins, sans-serif',
        height: '35px',
        width: '100px',
        '&:hover': {
            backgroundColor: grey[500],
            color: 'white'
        },
        '@media (hover: none)': {
            '&:active': {
                backgroundColor: grey[500],
                color: 'white'
            },
        },
    }));
    return (
        <ColorButton variant="contained">{children}</ColorButton>
    )
}

export default CustomButtonBlack