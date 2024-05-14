import React, { useEffect, useState } from "react";
const baseUrl = "https://jsonplaceholder.typicode.com/users";

const UserCrud = () => {
  const [userRes, setUserRes] = useState({
    isLoading: false,
    data: [],
    filterData: [],
    resMessage: "",
  });

  // pagiantion

  const [pagination, setPagination] = useState({
    total: 0,
    current: 1,
    previous: null,
  });

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [formError, setFormError] = useState({
    name: false,
    email: false,
    phone: false,
  });

  const [state, setState] = useState({
    isEdit: false,
    selectedId: null,
    searchQuery: "",
    isFormSubmit: false,
  });

  const updateState = (obj) => {
    setState((prev) => ({
      ...prev,
      ...obj,
    }));
  };
  const updatePagination = (obj) => {
    setPagination((prev) => ({
      ...prev,
      ...obj,
    }));
  };

  const userOnChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
    if (value.trim() === "") {
      setFormError((prev) => ({ ...prev, [name]: true }));
    } else {
      setFormError((prev) => ({ ...prev, [name]: false }));
    }
  };
  const queryOnChange = (e) => {
    const { name, value } = e.target;
    updateState({
      searchQuery: value,
    });
    let _data = [];
    if (value.trim() === "") {
      _data = userRes.data;
    } else {
      _data = userRes.data.filter((each, idx) => {
        return each.name.toLowerCase().includes(value.toLowerCase());
      });
    }
    setUserRes((prev) => ({
      ...prev,
      filterData: _data,
    }));
  };

  const addDataHandler = () => {
    if (!userData.name || !userData.email || !userData.phone) {
      updateState({
        isFormSubmit: true,
      });
      setFormError({
        name: true,
        email: true,
        phone: true,
      });
      return;
    }
    setUserRes((prev) => ({
      ...prev,
      filterData: [...prev.filterData, userData],
    }));
    setUserData({
      name: "",
      email: "",
      phone: "",
    });
  };
  const updateDataHandler = () => {
    const _data = userRes.filterData.map((each, idx) => {
      if (idx === state.selectedId) {
        return {
          ...each,
          ...userData,
        };
      } else {
        return { ...each };
      }
    });
    setUserRes((prev) => ({
      ...prev,
      filterData: _data,
    }));

    setUserData({
      name: "",
      email: "",
      phone: "",
    });
    updateState({
      isEdit: false,
    });
  };

  const handleUpdate = (id, data) => {
    updateState({
      isEdit: true,
      selectedId: id,
    });
    setUserData(data);
  };

  const handleDelete = (id) => {
    const _data = userRes.filterData.filter((each, idx) => {
      return idx !== id;
    });
    setUserRes((prev) => ({
      ...prev,
      filterData: _data,
    }));
  };

  const pageHandler = (pageNumber) => {
    const prevPage = pagination.current;
    updatePagination({
      page: pageNumber,
      previous: prevPage,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      let res;
      try {
        setUserRes({
          ...userRes,
          isLoading: true,
        });
        res = await fetch(baseUrl);
        const data = await res.json();
        setUserRes({
          ...userRes,
          isLoading: false,
          data: data,
          filterData: data,
        });
      } catch {
        setUserRes({
          ...userRes,
          resMessage: "Something went wrong",
        });
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const totalData = userRes.filterData.length;
    const lastIndex = totalData - 1;
    const perPage = 5;
    const startPage = updatePagination({
      total: totalData / perPage,
    });
  }, [userRes.filterData]);

  return (
    <main className="h-screen">
      <div className="flex justify-between items-center">
        <div className="">
          <input
            type="text"
            className="ring"
            value={state.searchQuery}
            name="searchQuery"
            onChange={queryOnChange}
          />
        </div>
        <div>
          <div className="flex">
            <div className="">
              <input
                type="text"
                name="name"
                className={`ring ${
                  formError.name && state.isFormSubmit ? "ring-red-500" : ""
                }`}
                placeholder="name"
                value={userData.name}
                onChange={userOnChange}
              />
              {formError.name && state.isFormSubmit ? (
                <p className="text-red-500">This field is required</p>
              ) : null}
            </div>
            <div className="">
              <input
                type="text"
                name="email"
                className={`ring ${
                  formError.email && state.isFormSubmit ? "ring-red-500" : ""
                }`}
                placeholder="email"
                value={userData.email}
                onChange={userOnChange}
              />
              {formError.email && state.isFormSubmit ? (
                <p className="text-red-500">This field is required</p>
              ) : null}
            </div>
            <div className="">
              <input
                type="text"
                name="phone"
                className={`ring ${
                  formError.phone && state.isFormSubmit ? "ring-red-500" : ""
                }`}
                placeholder="phone"
                value={userData.phone}
                onChange={userOnChange}
              />
              {formError.phone && state.isFormSubmit ? (
                <p className="text-red-500">This field is required</p>
              ) : null}
            </div>
          </div>
          <button onClick={state.isEdit ? updateDataHandler : addDataHandler}>
            {state.isEdit ? "Update User" : "Add User"}
          </button>
        </div>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userRes.isLoading ? (
              <div>Loading...</div>
            ) : (
              <>
                {[...userRes.filterData].map((eachUser, userIdx) => {
                  return (
                    <tr key={`userRes-${userIdx}`}>
                      <td>{eachUser?.name}</td>
                      <td>{eachUser?.email}</td>
                      <td>{eachUser?.phone}</td>
                      <td>
                        <div className="flex gap-4">
                          <button
                            onClick={() => handleUpdate(userIdx, eachUser)}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              handleDelete(userIdx);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </>
            )}
          </tbody>
        </table>
      </div>
      {/* <div className="paginatoion flex gap-4 justify-center">
        {[...new Array(pagination.total)].map((_, idx) => {
          const pageNumber = idx + 1;

          return (
            <button onClick={pageHandler} key={`pagination-${idx}`}>
              {pageNumber}
            </button>
          );
        })}
      </div> */}
    </main>
  );
};

export default UserCrud;
