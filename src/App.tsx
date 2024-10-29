import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { countryListState, countrySelector, ICountry } from "./atom";
import styled from "styled-components";
import List from "./List";

interface IForm {
  country: string;
}

export default function App() {
  const setCountryList = useSetRecoilState(countryListState);
  const { favorite, visited, wishlist } = useRecoilValue(countrySelector);
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<IForm>();
  const onSubmit = (data: IForm) => {
    const newCountry: ICountry = {
      id: Date.now(),
      text: data.country,
      category: "wishlist"
    }
    setCountryList((prev) => {
      return {
        ...prev,
        wishlist: [newCountry, ...prev["wishlist"]]
      }
    })
    setValue("country", "");
  }
  return (
    <Container>
      <div>
        <h1>내가 가고싶은 나라들</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("country", {
              required: {
                value: true,
                message: "🤮 required"
              }
            })}
            name="country"
            placeholder="이름"
          />
          <p>{errors.country?.message}</p>
          <button>가자!</button>
        </form>
      </div>
      <div>
        <ListWarpper>
          {wishlist.map((country) => (
            <List key={country.id} {...country} />
          ))}
        </ListWarpper>
        <h1>내가 가본 나라들</h1>
        <ListWarpper>
          {visited.map((country) => (
            <List key={country.id} {...country} />
          ))}
        </ListWarpper>
        <h1>내가 좋아하는 나라들</h1>
        <ListWarpper>
          {favorite.map((country) => (
            <List key={country.id} {...country} />
          ))}
        </ListWarpper>
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const ListWarpper = styled.div`
  display: flex;
  flex-direction: column;
  height: 350px;
  overflow: scroll;
`