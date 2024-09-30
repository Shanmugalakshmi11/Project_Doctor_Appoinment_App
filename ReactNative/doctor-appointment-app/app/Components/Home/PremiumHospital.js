import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Button,
  ActivityIndicator,
} from "react-native";
import { Card } from "react-native-elements";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const PremiumHospital = ({}) => {
  const navigation = useNavigation();
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For error handling
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/hospitals")
      .then((response) => {
        setHospitals(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching hospitals:", error);
        setError("Error fetching hospitals");
        setLoading(false);
      });
  }, []);

  const handleLearnMore = (hospitalId) => {
    console.log("HospitalID", hospitalId);
    navigation.navigate("HospitalDetail", { id: hospitalId });
  };

  const renderHospital = ({ item }) => (
    <Card containerStyle={styles.card}>
      <Image
        style={styles.image}
        source={{
          uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAXMAAACICAMAAAAiRvvOAAAA2FBMVEX////aMEmhAACeAACbAADZIT/ZKkXXBzLZJkKjDg7keYXYFDfjyMjroanYGjvOmJjbN0/lf4r33N/r19exS0vdSV3yxMnfXGzasrLFgIDeurrJJjrUpaXib3z++Pnx4uKtOzvKjIy2Xl788PH0ztLw4ODo0NDXAC7fVmfusLfvt73jc4DcRFnoj5nixMTu3d3sqK/miJK7aGimICC/cnLqmqPPm5u0VVX219quQkKoKSnWqamlGhq4YGCzUVHAd3eqMjLGFS7CABjUio7JSFTVABPVAB/hZXTOoAoNAAAS6klEQVR4nO2dfUPiuBbG6XulUhhUUC8UmTKCKIw66qjjjO7uveP3/0Y3OUnavLUUisKOff7Yddrmpb8eTpKTNK3VKlWqVKlSpUqVKlWq9O/WeX82jTddiQ+mC8cJvcl009X4UDpwDcNww1Zn0xX5QALmiLrX33RNPo4oc8NwjMqtv5MS5sjBVNDfRylzw/WjTdfmY4hjbvgHm67NxxDP3Agbm67Oh5DA3PAql/4OEpn7V5uuz0eQyNzwNl2fjyCJefgHRQGapjncdB20kpj7nzZdobXpzjZNeyuhS8zd1qYrtDZZJpK96VroJDH/gxy6/e9h/seMRY+wb7nedC10+nOZ137a9vdN10GrP5h5LdrSe/mTmW+rKubvr4r5mynamx/2ej8O56cD8UQe87jTqE9afhi6B/3ZtL1UgXuHzeGwt5v7BL8cN4/EC6Ld3nA4/HGal2p+NxzeHQvBuEGBwgrry6FahV1UZvPwyxKZ9H5aNpJlwf/sp+veXnIyk/noyvBCx3fhvOv6YRCcT/Pvaohzx39EQwuKQ//9tStec4IuOYG/mia6xuZz3P1OUqFkz5Jp4Jxv0P8HNyzjlzk713tix35+5ZLMcRp6o8f4bxkZPvZM//6B/4HLPPzGMkvM4cs1O2Te5d4/02C4gxKYgqB6x+S8nvlgFga+dMYw/NCr3+eU1bTIIKRnpwVa9oNgkvuWae0DETJOTJkPToRkR0LW+BA60uQusX/CmVPT5lJxY/1d3D9PmKO/pceIB6oWK+WQXBC/8JkRc3nmy9yRM1F1+suWeKc52jd7Gczbr54j82bYvYPRIuafbamkOXcNZd6k16TMf5Cagp3DH9/4Z0WYXws5W79q+PkKhSWGuwrzeCDSspGDiR5FgEoukvYesohTGA+nmrF/3PcUC+fkBpMsz06Yf7fII318tGjx9rHMnJKyUt8yJEN18+auN0SDGTjJQcf/HuKoFcrzEf/84eo7YIV8lPnyxI4lD3h55l8sqPjTi2mT+iEDerSSm7GJKeQRj25yiRPqny9kQ771/BziQH2cMbOBmVsYnmX24Abjw0ebGQzH/NcAmNo7N80eZX4HRx4ZsB9g61bqeHAuOKndhAcxoI/oC0b1cgzX7T0TUCszN08s094nDmV+AhVoHmEzOoJmIjp8wsfsH9nI57IX18r+j+I9FhDHcgytqTehnmIElVh0Sg+D+/yAS37m2rRTMFfehf/CRB4E5ujAS5LPgDgglKqZXLRr8z+q5ZkLQI9oAbyPw5Uyn3S3Dnq2zSKyFOaF5I4vNWU2qSs55A8CTiuJNe1blJ5AAJI1+SPgouwef4FpPnLn55RSjzsGPzRW1ArMhZq/kDJ3pCSmzXeOeJ0UQ74qc8MIztVCm8zLCgI4yQ0T5pYYfAJHfSPltmNyoVjCV+gBfdNkBM+X/r08c7EK5KHae/yxO5xG71zinSJ+pRRzw5koxRLfsi8ffsYVZf0JwvxRvMLiUCXCzCxmxVBXcdIHSpNAXlvpk1meuS0OP+AxfBYO4YbIeq5pFBdy5SWZa1Yg6SggRTZnscBcNB6wKKsnJ4MfN3s4qpkT7y09vJ6VZr40cxkmrqrQz6VpdAHiqCjwcsxV6OBOf6kVwobOui77YtsIurEUG0sAUs64rlIvDWxOHDnB02MlLd9XPBbPP1vKc66doHqcqHdY+1bYyssxN5yuWDAwP1QrxNsxGI90DfbcD2oy6AhSOzP5dpgI/3wsqe3Yw0lotGF55lLjOLTUuT3csp+oVf21BPJyzI1QXCUAYyJNqx5zFgnM5WAKbr6+7En6usdBNdWffqTxSKelmEsX6Jj/1DJno+r3YG54wnKYpt5HEKgkOkKYi2djMkJSZabtpqn6kY0w/6xj/nUp5GWZGx5fz6amksnd0ZYHM9c45sz6UShbzfxbZu1tEs9djrnrO2EYBKGTMTx1L7iyc+2cYy757kGWnWP9C+z8Tm8zlv0yPD49PZ33nh9tuyhzN/Rany47o/v7zuV5GGgjX/zy6abGV4O4IQ+L5crwvs+PtaLNwxYzj7TILXvIZRcfcoHqHOa+NxHeHB29auON3PLppqZDiwWNIR3Za5jD4EPTb+H1Fszt9TAf6vos9o38e//63V7E3PX6ShyrPQk1j6aenG9aKhmsO+5Z6JjvZ/mkVOtgLg7EhN5UCeZaM7el2TFSIdPKZe60tBNCl57G0JOqknGomurJTJnqmOdEMZhKMp/b6i9wvh7md6qZW08Zr04QU89gHtT1iWr3qldPDZ3EW5pyGhhXM8465qTjklEiUUnmuDcnhWsgNrMG5jsq8uxpjSM7k3kwy0zVDlRDZ0+VxhWlUVEkRLV1zGF0pw8dMZVkDk2GEJWlvaXSzPc0riXHTWLoWuZhNnJk6Yp7cVjXhcbPLfGXBROKSSxKy/wLPBYlysU5xbLM1ZADhMfLM1db0PwZU2ReOub+a16i2qXckCZr1ilz0+IsPf4mBhK1zMlsqLRAf/DNFubmSjEnsVquXjSOX5q5Mh7Km7vD0jMPF6zNmcguPaA9HGD+ADOI1NQjOm+Z0tQzJ0Ei+yTtWgyebZMLXpdlTt8AYJcf40m3dfjzWHYtcsxU0bGtYR6eLUjVlr0Lcy5kHGrCTPnLUbN5RNcd8KvAM5jX9snDeWzO977uHQ9fIGXa1SjN/Jh0GezPw2bz2sKnmjtrYL4rM8+cuUt0os5Bu8aiRLVXydBdOmVE4i10koqtU8HjAy5tFvPaDak9DVGQP9MuUGnmSf60XqgS67DznhxLWbzifa4yd3Szy6JGct+FvhDDYlzX/CIPS3Rwmcxrx5ZgM5Z9wi0MKM9cXJCE3wZYB/Mjibl2MCRJ9S1FFubKq7yoQ0/iiqcPNJiGV4uJvZh0vaKqO4slQ+n2hSEMv7aQKsLHpDmLU3yMJuTXK4KOTZI9yh1mVvg8D9l6RU7J8ktO39Ehfj7wu2znGbcm5PuX7Fq6ixPV6lKUMSS7HHGx3MHd52/mzsPzofwET3d3d7OX3e7dXb/smE/7z4fSSA6l2pU95RwdkzBF6NicJo3x32Lx86P9J1Sro3mSnuU52FUurn3FGcgVlKp/IiGXFy/otCszd4pss3AWahNlxs//XD1JzNWZdFXR3xLzMHsJaKqRxNwng6gPyFwa+euiqqpkfx4U2dniXmpE6dvTFXM7920FppXeyZWDLjTMVTFfjXlQJFHFnGktzP0iiSrmTDLzAt1zlblbJFEWc9T//eDMNSuqVMnIC+1rkcF8d9hsbuXmHW8nibn1T4E0kRSvctXVthplMP+Akpn/t0AapaddiF7FnElm/neByMmVNIp3bouUVDFnkpn/VWBvLXnOJyy0P3TFnElhvtg3n8kRwmIbLFbMmWTm//EWvqIvIy+4HVfFnElhvrAT8kle+VnMnVfMEynMjSDfo3eUZROLfxmgijmTyjw/SqjMJYsrm/NSVsypNMxdI7u/GIfKMriFU/5UFXMmDXMEPcvS2ypyIyxYUsWcScfccDMmfqaaxeSF5uWwMphHWGu6mdV125+Vr0TRW9EyR+3iuWrq0bm61LNgHBcrg/ntb8/7X+HbeiNNQt8pFBzN1fnY84r86jOYG773SeqONALd60ELejmcMpg3nM3v/drBVSvaLmUL9aILjVWymCMmQWvWYdY+ugq0uxAVCymCtpg5LEkoOMzIUXnmCKgTBkFr8tq98LQ2biz1XYUtZj4Y41tJ2rBOo36xygNYB3MCHksPHHmWJX6PW8y8djYOuX2Ufjv+Sh9GWRvzPDnLfPtsm5nX4hG3uMtbojfG6z2YFx2BEm01c0FbzNx1lvpITsWcaXXmbrB4q0ZeFXOmlZm7wXJ74RZhPhh1OqOcJwnnc4qN7judTjtvKNhGOdwvGit6uQvq48xKvjVz11nOyhczb39yghApCOXRGFGnH5Dz3uRMS+1s4gVw/uK2LRzudsnmSJ3X5ALJK9a73S5Up4Mu7rq4qepSTQSLR5UkeQR96FoO0PUT1sl8Y+ZOa+kPni1gXk+3xfQ1+19O3TA57zqe2n2eOkn8DZ2fpAGjRui6Y1z+RcBdIL5Z2XVcH0Z308BlGyxT8e9gxq9cJYODNg5tu27ApoPflnmwwgdyc5lHLWGYG0rD22givUrtuNJr7nUxru96r8wo6ENtjIUcRKNBpk3eW5gqmxM4KfOOuFuqO57CTYVlmf9VgLjrrRKayGXeQkDQqNdDP1y4L0cI9LbJQZ9c4LAb5lQHVg46z3IImP8hBdx6aQZwXugCJMzPfgdBQLKiSn9zZ2ODnsGZ4Cc4nsbrYP6Pn7W7c6LgYKUPKeYwd+s+4jEbxbVo0OmDxXqcHbchhOx79c4giuLRzIEqjrkH3yFEb1HzGLU7V8jNpLE3XIAz9bCp1DsxyqDzCeyV/8RvwjyKkQIcfIG/sNiz6wByx7+Fak5hkxRv6pRnbp/WbgMnb4tnx1nx63I5zA3XCNMtRu/hSPqKUgQ25dXThrMBD2Gc+mz8xq/fTS+Y+qlzogUYYTdhTKLS3JAuYQ7S9hUHxBTShqR94UC+62BeixpuVkjLDVf/Qmsec3G3AJhzHSeEJrgynrBuaQANXfLuNV5AKQ2KUxsmBRih0C7D/iZhArAA8wtcYiC0In2a8xqYI3XOkduUrR219gclvqCYa+fibgF4OUfyscYpTudJE1cRhp7M7uGsM3vUhLkjzQQ2cAOQvGK5mDmphdRwd/01MkcazQ5we+X7uMPk+6h5mjSW7ZILymMuhYTxq0dJfwHTVeOX5LcwSLPOZ66ywL3wJGS+mDlu5EO5iChcL3O4l2njqt+dTLrns7NR2fnCHObKxzDRpT7tjuI5HN37p7dO+lxi7FuyvgUOzANlghf8M5uPW8gcW4EmpAeTHetlvlblMFemvA/cZAYKv8ob6PacwtmxyVjoatb1VgEdI80D6bvp5hoLmd86+qWwW848zmaurGJ6dRNMTtaCSOz0WR8bvK3vfdItV4C+osbxdBAvh/qshcyxJ9JF4qDl2V7mNS+TuXI3fZ8xx25D/5FvzCy53VfwrH7gvZ7JjQ48VM0PJeYajYXMw4wX7KfhdjNvuSswh8G1dtgrNpxXY591rowrwQlAATq3E6Q9n4XMs578/RrGoW/JXNpkoRjzUZD1TgEZLib/HPTHtHfr+kHIxcAyA/R+2kddxBwPALTrAtYRb1n09aIykuJHSzDXjgqAOY8mvpx4If0QmJME+7KZ45aCdo4KMddt8rYW5gWSrKrYW4F5dtdb53WizpXhEXNPYmDaRhrLW9K36L7uPlqDP38pkGRlifugFWMeZd2t2Hxxii9b0ENi4yxgrunQDDjftJC5nzEAOCsf45K3zVyvROdSjHkNh5EcXW7omqwlTR08DGI8oa+o8cWAi/4YFjLHnXldQ9wv31eUt+Rds4TFSQWZX/kZ5qzGtVK1uZMwJtLs0YZ/deyZLWR+6Wi7T/B2cknmud+iK69psDxzvAWp7k5wLyh7dh7vckd324Cxv9oMC6P5hcxxpMBVV+7eOqWZF3vbv4Qu3KWZw4YOjuLRYZYiyIwB4SdCc6XBYvlSCFoxy1WY+3InpaurBYmpl2P+xmZOF2MuyfwepwkkhzyCH3VijHXZjI3UnxDmcgsIse9k7bzIPFSCy3TH30DsQEUwZVGO+Rt7c6wzb2nmtSvc9AaCjUE26RVtT5rHn+FgJZ15onMW/oS3dECezoOIzCe64EofZk6E8QAdWJdhbiubkL+BZsHSzMlEkdNKCLVfYWotnc9E7scxUlOP+/CUaP8QmCM8rp9cMWpBjuniBZH5zOdGQEkvk0xNdZOlM5cBStQqx9y+Xnz1GjTzlmZeO4Bph8C4mo5GndsDmA11w2TIDLPDbhj0LzvofKMLU8zJjCgEi2GKI3RnKIPprAULN/ivsInMiR/BLxgNGm6y79WAFOtNGqiU6Se8/MAN70uNiewiOyuuQ1O6SmQJ5rUu9OxdH6/jIsNMn3+3j65dwZ/oSc63xLUW92TtQHqBI+QvMKc/LC8MAsdNezxtssbGxaXAZ4Bcrz0oMfa31M3b30xxnxjiEsxrt2NxOY8nLmoaSStE+PO0gMFFKFwgzI9KzPm3YP10DBALWRiO3y4Rb7HszystWVlV7ZmPjIi0cQ3PcX7LF7wGTijN45+zsKG0NI6q4STfucdz5SP+DH2olyFdfuf6wYWYwSR0hKVjMV1nJ1+ZZIHcCiw2ao8dZ8yY1wOn0Nt3eBvrneEbRhMzNOickaqOGo2GMjKfooNyYCs+6/ueF3hB91a/hvTqAJ0MvFA6z/2Qpn0HZeBdXMmP7AyVJ44yp11clqHMPE3PXXwifL0EK41vUe1ZcR2US5GlKL3D3Xc18ZJKl1VpFWnOi84LXVG6rAWVqLSNLxX88aqYv78q5u+vivn7q2L+/mLvtlR6P6XvcFWqVKlSpUqVKlWqtOX6PydNkDXc248tAAAAAElFTkSuQmCC",
        }} // Replace with real hospital image URL
      />
      <View style={styles.column}>
        <Card.Title>{item.name}</Card.Title>
        <Text style={styles.address}>{item.address}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>{item.rating}/5</Text>
        </View>
        <Text style={styles.description}>{item.description}</Text>
      </View>

      <Button
        title="Learn More"
        onPress={() => handleLearnMore(item.id)}
        color="#007BFF"
      />
    </Card>
  );
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Premium Hospitals</Text>
      <FlatList
        data={hospitals}
        horizontal={true}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderHospital}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 20,
    width: "50%",
    height: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    borderRadius: 10,
    padding: 15,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 0.2 },
    shadowRadius: 5,
  },
  image: {
    width: "100%",
    height: 90,
    borderRadius: 10,
  },
  column: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginTop: 15,
  },
  address: {
    marginTop: 10,
    fontSize: 16,
    color: "#7f8c8d",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  rating: {
    marginLeft: 5,
    fontSize: 18,
    color: "#2c3e50",
  },
  description: {
    marginTop: 20,
    fontSize: 14,
    color: "#7f8c8d",
  },
});

export default PremiumHospital;
