import { useSetRecoilState } from "recoil";
import { countryListState, ICountry } from "./atom";
import styled from "styled-components";

export default function List({ id, text, category }: ICountry) {
    const setCountrys = useSetRecoilState(countryListState);
    const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const { currentTarget: { name } } = e;

        if (name === "DELETE") {
            setCountrys(oldCountrys => {
                return {
                    ...oldCountrys,
                    [category]: [
                        ...oldCountrys[category].filter((country) => country.id !== id)
                    ]
                }
            })
        }
        else {
            setCountrys(oldCountrys => {
                const countryCopy = [...oldCountrys[category]];
                const targetIndex = countryCopy.findIndex((country) => country.id === id);
                const newList: ICountry = {
                    id, text, category: name as any
                }
                const destinationList = [...oldCountrys[name]];


                countryCopy.splice(targetIndex, 1);
                destinationList.splice(destinationList.length, 0, newList)

                console.log(countryCopy)
                return {
                    ...oldCountrys,
                    [category]: [...countryCopy],
                    [name]: [...destinationList]
                }
            })
        }
    }
    return (
        <Container>
            <Wrapper>
                <h3>{text}</h3>
                {category === "wishlist" &&
                    <BtnWrapper>
                        <button name="visited" onClick={onClick}>✅</button>
                        <button name="DELETE" onClick={onClick}>🗑️</button>
                    </BtnWrapper>
                }
                {category === "visited" &&
                    <BtnWrapper>
                        <button name="favorite" onClick={onClick}>👍🏻</button>
                        <button name="wishlist" onClick={onClick}>❌</button>
                    </BtnWrapper>
                }
                {category === "favorite" &&
                    <BtnWrapper>
                        <button name="visited" onClick={onClick}>👎🏻</button>
                    </BtnWrapper>
                }
            </Wrapper>
        </Container>
    )
}
const Container = styled.ul`
    display: flex;
    justify-content: flex-start;
    padding: 30px;
`;

const Wrapper = styled.li`
    display: flex;
    align-items: center;
    
    `;

const BtnWrapper = styled.div`
    /* display: flex;
    align-items: center;
    justify-content: center; */
`;
