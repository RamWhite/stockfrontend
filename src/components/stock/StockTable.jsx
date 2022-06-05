import React, { useState, useEffect } from "react";
import AppBar from '../navbar/Appbar'
import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import { useLocalState } from "../../util/useLocalStorage";


const StockTable = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");

  //Open modal events
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //Modal dropdown menu consts
  const [type, setType] = React.useState('');

  const handleChange = (event) => {
    setType(event.target.value);
  };

  //Get table data
  const handleSendData = (e) => {
    e.preventDefault()
    const stock = {name, stockType}
    fetch('nomenclature/createStock', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(stock)
    })
  };

  const [stocks, setStock] = useState([]);
  const [name, setStockName] = useState([])
  const [stockType, setStockType] = useState([])

  useEffect(() => {
    fetch('stock/getStocks', {
      headers: {
        "Content-Type":"application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "GET",
    })
    .then((res) => {
      if(res.status === 200) 
      return res.json();
    })
    .then((data) => {
      setStock(data);
    });
  }, [])

  return (
    <>
      <AppBar/>
      <Container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            p: 1,
            m: 1,
            bgcolor: 'background.paper',
            borderRadius: 1,
          }}
          style={{'margin':'1% 0', 'padding': '1% 0'}}
        >
          <div style={{'display': 'flex', 'alignItems': 'flex-end', 'paddingBottom': '7px'}}>
            <Button variant="outlined" onClick={handleClickOpen}>
              Add New Stock
            </Button>
          </div>
        </Box>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add New Stock</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              fullWidth
              variant="standard"
              value={name}
              onChange={(e) => setStockName(e.target.value)}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                p: 1,
                m: 1,
                bgcolor: 'background.paper',
                borderRadius: 1,
              }}
              style={{'margin':'0', 'padding': '0'}}
            >
              <div>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} style={{'margin':'8px 0', 'padding': '0'}}>
                  <InputLabel id="demo-simple-select-standard-label">Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={stockType}
                    onChange={handleChange}
                    label="Type"
                  >
                    <MenuItem value={10}>Use</MenuItem>
                    <MenuItem value={20}>Expendables</MenuItem>
                    <MenuItem value={30}>Storage</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={handleSendData}>
                Save
            </Button>
          </DialogActions>
        </Dialog>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 350, maxWidth: 400 }} aria-label="simple table">
            {/* Nomeclature Table Column Headers */}
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Type</TableCell>
                <TableCell align="center" style={{width: 10}}>Actions</TableCell>
              </TableRow>
            </TableHead>

            {/* Nomeclature Table Content */}
            <TableBody>
              {stocks.map((stock) => (
                <TableRow
                  key={stock.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >

                  <TableCell component="th" scope="row">
                    {stock.name}
                  </TableCell>
                  <TableCell align="right">{stock.type}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        p: 1,
                        m: 1,
                        bgcolor: 'background.paper',
                        borderRadius: 1,
                      }}
                      style={{'margin':'1% 0', 'padding': '1% 0'}}
                    >
                      <div>
                        <IconButton
                          size="small"
                          aria-label="account of current user"
                          aria-controls="menu-appbar"
                          aria-haspopup="true"
                          color="inherit"
                        >
                          <EditIcon />
                        </IconButton>
                      </div>
                      <div>
                        <IconButton
                          size="small"
                          aria-label="account of current user"
                          aria-controls="menu-appbar"
                          aria-haspopup="true"
                          color="inherit"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  )
};
  
export default StockTable;
