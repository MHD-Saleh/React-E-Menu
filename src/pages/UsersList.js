import { filter } from "lodash";
import { useEffect, useState } from "react";
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from "@mui/material";
// components
import Scrollbar from "../componant/Scrollbar";
import SearchNotFound from "../componant/SearchNotFound";
import { UserListHead, UserListToolbar, UserMoreMenu } from "../componant/user";
import instance from "../authConfig/axios";
import moment from "moment";
//

//import USERLIST from "../componant/UserTest";

// ----------------------------------------------------------------------

const New_TABLE_HEAD = [
  { id: "id", label: "id", alignRight: false },
  { id: "name", label: "name", alignRight: false },
  { id: "phone", label: "phone", alignRight: false },
  { id: "points", label: "points", alignRight: false },
  { id: "created_at", label: "created_at", alignRight: false },
  { id: "updated_at", label: "updated_at", alignRight: false },
  { id: "" },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function User() {
  const [data, setdata] = useState([
    {
      id: 1,
      avatarUrl: "test",
      name: "saleh",
      company: "saleh com",
      salary: 1000,
      isVerified: "true",
      status: "active",
      role: "Main admin",
    },
  ]);

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const filteredUsers = applySortFilter(
    data,
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = filteredUsers.length === 0;

  const deleteUser = async (dd) => {
    //api/productDelete
    try {
      await instance({
        // url of the api endpoint (can be changed)
        url: `api/usersDelete/${dd}`,
        method: "POST",
      }).then((res) => {
        // handle success
        console.log("user deleted");

        getuser();
      });
    } catch (e) {
      // handle error
      console.error(e);
    }
  };
  const getuser = async () => {
    try {
      await instance({
        // url of the api endpoint (can be changed)
        url: "api/customerView",
        method: "GET",
      }).then((res) => {
        // handle success

        setdata(res.data);
      });
    } catch (e) {
      // handle error
      console.error(e);
      // handelClick();
      // setmessage("error with get product List");
    }
  };

  //api/customerView

  useEffect(() => {
    getuser();
  }, []);

  return (
    <page title="customer List">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography
            variant="h3"
            sx={{
              paddingLeft: "20px",
              width: 260,
              height: 50,
              backgroundColor: "primary.main",
              color: "white",
              borderRadius: "10px",
            }}
          >
            Customer List
          </Typography>
        </Stack>

        <Card>
          <UserListToolbar
            numbers={data.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={New_TABLE_HEAD}
                  rowCount={data.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        id,
                        name,
                        phone,
                        points,
                        created_at,
                        updated_at,
                      } = row;
                      const isItemSelected = selected.indexOf(name) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell align="left">{id}</TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              <Avatar
                                alt={name}
                                src={"test"}
                                sx={{ margin: 2 }}
                              />
                              <Typography variant="subtitle2" noWrap>
                                {name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{phone}</TableCell>
                          <TableCell align="left">{points}</TableCell>
                          <TableCell align="left">
                            {moment(created_at).format("YYYY/MM/DD")}
                          </TableCell>
                          <TableCell align="left">
                            {moment(updated_at, "YYYYMMDD").fromNow()}
                          </TableCell>

                          <TableCell align="right">
                            <UserMoreMenu
                              edite={() => {
                                console.log("edite : " + id);
                              }}
                              delete={() => {
                                console.log("delete : " + id);
                                deleteUser(id);
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 10 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </page>
  );
}
