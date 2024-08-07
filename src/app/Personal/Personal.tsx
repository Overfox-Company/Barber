import { Container, Item } from '@/components/Layout/Layout'
import { PRIMARYCOLORHOVER } from '@/constants/Colors'
import { NextPage } from 'next'
import AddPersonal from './components/AddPersonal'
import ListBarbers from './components/ListBarbers'

interface Props { }

const Personal: NextPage<Props> = ({ }) => {
    return <div style={{ width: '100%', }}>
        <Container justifyContent={"center"}>
            <Item xs={11} >
                <div style={{
                    height: 550,
                    backgroundColor: 'white',
                    padding: 32,
                    borderRadius: 20,
                    boxShadow: '0 8px 8px rgba(0, 0, 45, 0.1)',
                }}>
                    <Container style={{ height: '100%' }} columnSpacing={2}>
                        <Item xs={4}>
                            <AddPersonal />
                        </Item>
                        <Item xs={8}>
                            <ListBarbers />
                        </Item>
                    </Container>
                </div>
                <br />
            </Item>
        </Container>
    </div>
}

export default Personal