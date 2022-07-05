import { filter } from "lodash";
import { sentenceCase } from "change-case";
import { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from "@mui/material";
// components
import page from "../componant/page";
import Label from "../componant/Label";
import Scrollbar from "../componant/Scrollbar";
import Iconify from "../componant/Iconify";
import SearchNotFound from "../componant/SearchNotFound";
import { UserListHead, UserListToolbar, UserMoreMenu } from "../componant/user";
import axios from "axios";
//

//import USERLIST from "../componant/UserTest";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "name", label: "Name", alignRight: false },
  { id: "company", label: "Company", alignRight: false },
  { id: "salary", label: "salary", alignRight: false },
  { id: "role", label: "Role", alignRight: false },
  { id: "isVerified", label: "Verified", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  { id: "" },
];

const New_TABLE_HEAD = [
  { id: "id", label: "id", alignRight: false },
  { id: "name", label: "name", alignRight: false },
  { id: "phone", label: "phone", alignRight: false },
  { id: "points", label: "points", alignRight: false },
  { id: "created_at", label: "created_at", alignRight: false },
  { id: "updated_at", label: "updated_at", alignRight: false },
  { id: "" },
];

const USERLIST = [
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
  {
    id: 2,
    avatarUrl: "test",
    name: "ghaith",
    company: "saleh com",
    salary: 100,
    isVerified: "no",
    status: "banned",
    role: "bitch",
  },
  {
    id: 3,
    avatarUrl: "test",
    name: "yazan",
    company: "saleh com",
    salary: 75,
    isVerified: "yes",
    status: "active",
    role: "bitch",
  },
  {
    id: 4,
    avatarUrl: "test",
    name: "user",
    company: "others com",
    salary: 10000,
    isVerified: "no",
    status: "banned",
    role: "vip",
  },
];

/*{
    id: 1,
    avatarUrl: "test",
    name: "saleh",
    company: "saleh com",
    salary: 1000,
    isVerified: "true",
    status: "active",
    role: "Main admin",
  },
  {
    id: 2,
    avatarUrl: "test",
    name: "ghaith",
    company: "saleh com",
    salary: 100,
    isVerified: "no",
    status: "banned",
    role: "bitch",
  },
  {
    id: 3,
    avatarUrl: "test",
    name: "yazan",
    company: "saleh com",
    salary: 75,
    isVerified: "yes",
    status: "active",
    role: "bitch",
  },
  {
    id: 4,
    avatarUrl: "test",
    name: "user",
    company: "others com",
    salary: 10000,
    isVerified: "no",
    status: "banned",
    role: "vip",
  }, */
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
  const navigate = useNavigate();
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
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(
    USERLIST,
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = filteredUsers.length === 0;

  const [data, setdata] = useState([]);
  //api/customerView
  const getuser = async () => {
    await axios
      .get("http://localhost:8000/api/customerView")
      .then((res) => {
        console.log("incoming data", res.data);
        setdata(res.data);
        //USERLIST = res.data;
        // for (const obj of res.data) {
        //USERLIST.push(obj);
        //}
        console.log("userlist data", USERLIST);
      })
      .catch((err) => {
        console.log("errrrrrrrrrrr", err.response.status);
        if (err.response.status === 401) {
        }
      });
  };
  useEffect(() => {
    console.log("updatinggggggg useEffect");
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
          <Typography variant="h4" gutterBottom>
            Customer List
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Userrrr
          </Button>
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
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
                  rowCount={USERLIST.length}
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
                        role,
                        status,
                        company,
                        salary,
                        avatarUrl,
                        isVerified,
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
                          <TableCell component="th" scope="row" padding="none">
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              <Avatar
                                alt={name}
                                src={avatarUrl}
                                sx={{ margin: 2 }}
                              />
                              <Typography variant="subtitle2" noWrap>
                                {name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{company}</TableCell>
                          <TableCell align="left">{salary}</TableCell>
                          <TableCell align="left">{role}</TableCell>
                          <TableCell align="left">
                            {isVerified ? "Yes" : "No"}
                          </TableCell>
                          <TableCell align="left">
                            <Label
                              variant="ghost"
                              color={
                                (status === "banned" && "error") || "success"
                              }
                            >
                              {sentenceCase(status)}
                            </Label>
                          </TableCell>

                          <TableCell align="right">
                            <UserMoreMenu />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
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
            count={USERLIST.length}
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
