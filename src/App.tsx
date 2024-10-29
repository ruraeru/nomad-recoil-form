import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { countryListState, ICountry } from "./atom";
import styled from "styled-components";
import List from "./List";

interface IForm {
  country: string;
}

export default function App() {
  const [countryList, setCountryList] = useRecoilState(countryListState);
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
    console.log(countryList)
    setValue("country", "");
  }
  return (
    <Container>
      <h2>내가 가고싶은 나라들</h2>
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
      {countryList["wishlist"].map((country) => (
        <List key={country.id} {...country} />
      ))}
      <h2>내가 가본 나라들</h2>
      {countryList["visited"].map((country) => (
        <List key={country.id} {...country} />
      ))}
      <h2>내가 좋아하는 나라들</h2>
      {countryList["favorite"].map((country) => (
        <List key={country.id} {...country} />
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  text-align: left;

  form > button, input {
    width: 250px;
  }
`;