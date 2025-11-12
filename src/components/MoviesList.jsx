import React, { useEffect, useState } from 'react';
import { Form, Table, Container, Button } from "react-bootstrap";

const MoviesList = () => {
  const [kino, setKino] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");

  useEffect(() => {
    const api = 'https://www.omdbapi.com/?s=ip man&apikey=c65fcde9';

    fetch(api)
      .then((res) => res.json())
      .then((data) => {
        if (data.Search) {
          setKino(data.Search);
        } else {
          setKino([]);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    setName(e.target.value);
    console.log(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetch(`https://www.omdbapi.com/?s=${name}&apikey=c65fcde9`)
      .then((res) => res.json())
      .then((data) => {
        if (data.Search) {
          setKino(data.Search);
        } else {
          setKino([]);
        }
      })
      .finally(() => setLoading(false));
  }

  return (
    <div
      className="min-vh-100 d-flex flex-column justify-content-start py-5"
      style={{
        background: 'linear-gradient(145deg, #0f2027, #203a43, #2c5364)',
      }}
    >
      <Container fluid className="d-flex flex-column justify-content-between min-vh-100">
        <div>
          <h1 className="text-center text-light mb-4 fw-bold">
            🎬 Movies Collection
          </h1>

          <Form onSubmit={handleSearch} className="d-flex justify-content-center mb-5">
              <input onChange={handleChange} type="search" placeholder="Write movie name" className="w-50" value={name} />

              <Button type='submit'>Search</Button>

          </Form>

        </div>

        <div className="table-responsive flex-grow-1">
          <Table
            bordered
            hover
            responsive
            variant="dark"
            className="align-middle text-center mb-0 h-100"
          >
            <thead className="table-dark sticky-top">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Year</th>
                <th>IMDb ID</th>
                <th>Type</th>
                <th>Poster</th>
              </tr>
            </thead>

            <tbody style={{ height: '100vh' }}>
              {kino.length > 0 ? (
                kino.map((item, index) => (
                  <tr key={item.imdbID}>
                    <td>{index + 1}</td>
                    <td>{item.Title}</td>
                    <td>{item.Year}</td>
                    <td>{item.imdbID}</td>
                    <td>
                      <span>
                        {item.Type}
                      </span>
                    </td>
                    <td>
                      <img
                        src={item.Poster}
                        alt={item.Title}
                        width="90"
                        className=""
                        loading="lazy"
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-light fs-4 py-5">
                    🎞 Loading movies...
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </Container>
    </div>
  );
};

export default MoviesList;
