import { Container, Item } from '@/components/Layout/Layout'
import { NextPage } from 'next'
import AddPersonal from './components/AddPersonal'
import ListBarbers from './components/ListBarbers'
import { Box } from '@mui/material'

interface Props { }

const Personal: NextPage<Props> = ({ }) => {
    return <div style={{ width: '100%', }}>
        <Container justifyContent={"center"} alignItems='center'>
            <Item xs={11} >
                <Box style={{
                    backgroundColor: 'white',
                    boxShadow: '0 8px 8px rgba(0, 0, 45, 0.1)',
                }} sx={{
                    borderRadius: { xs: 4, },
                    padding: { xs: 4, lg: 2 },
                    minHeight: { xs: 700, lg: 600 },
                }}>
                    <Container style={{ height: '100%' }} alignItems='center' columnSpacing={2} rowSpacing={2}>
                        <Item xs={12} lg={6}>
                            <AddPersonal />
                        </Item>
                        <Item xs={12} lg={6}>
                            <ListBarbers />
                        </Item>
                    </Container>
                </Box>
                <br />
            </Item>
        </Container>
    </div>
}

export default Personal