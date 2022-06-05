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
import { Link } from "react-router-dom";
import ajax from "../../Services/fetchService";

const NomenclatureTable = () => {
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
  const [modalType, setModalType] = React.useState('');

  const handleChange = (event) => {
    setModalType(event.target.value);
  };

  //Dropdown stock consts
  const [stock, setStock] = React.useState('');
  
  //Product consts
  const [products, setProducts] = useState([])
  const [name, setProductName] = useState([])
  const [barcode, setProductBarcode] = useState([])
  const [type, setProductType] = useState([])
  const [arrivingCost, setProductArrivalCost] = useState([])
  const [sellingPrice, setProductSellingPrice] = useState([])

  //Set products
  const createProduct = (e) => {
    e.preventDefault()
    const product = {name, barcode, type, arrivingCost, sellingPrice}
    ajax("nomenclature/createProduct", "POST", jwt, product).then((product) => {
      console.log(product);
      handleClose();
      getProducts();
    });
  };

  function getProducts(){
    ajax('nomenclature/getProducts', "GET", jwt).then(
      (data) => {
        setProducts(data);
      }
    );
  }

  //Get products
  useEffect(() => {
    getProducts();
  }, [])

  //Delete product by id
  function deleteProduct(id) {
    ajax(`nomenclature/deleteProduct/${id}`, "DELETE", jwt).then(() => {
      console.log(`Successfully deleted ${id}`);
      getProducts();
    });
  };

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
          <div>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={type}
                onChange={handleChange}
                label="Type"
              >
                  <MenuItem value={"PIECE"}>PIECE</MenuItem>
                  <MenuItem value={"WEIGHT"}>WEIGHT</MenuItem>
                  <MenuItem value={"BOTH_PIECE_AND_WEIGHT"}>BOTH PIECE AND WEIGHT</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">Stock</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={stock}
                onChange={handleChange}
                label="Stock"
              >
                <MenuItem value={10}>Use</MenuItem>
                <MenuItem value={20}>Consumables</MenuItem>
                <MenuItem value={30}>Storage</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div style={{'display': 'flex', 'alignItems': 'flex-end', 'paddingBottom': '7px'}}>
            <Button variant="outlined" onClick={handleClickOpen}>
              Add New Product
            </Button>
          </div>
        </Box>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add New Product</DialogTitle>
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
              onChange={(e) => setProductName(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="barcode"
              label="Barcode"
              type="text"
              fullWidth
              variant="standard"
              value={barcode}
              onChange={(e) => setProductBarcode(e.target.value)}
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
                    value={type}
                    onChange={(e) => setProductType(e.target.value)}
                    label="Type"
                  >
                    <MenuItem value={"PIECE"}>PIECE</MenuItem>
                    <MenuItem value={"WEIGHT"}>WEIGHT</MenuItem>
                    <MenuItem value={"BOTH_PIECE_AND_WEIGHT"}>BOTH PIECE AND WEIGHT</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div style={{'padding': '0 10px'}}>
                <TextField
                  margin="dense"
                  id="arrivingCost"
                  label="Arrival Cost"
                  type="number"
                  fullWidth
                  variant="standard"
                  value={arrivingCost}
                  onChange={(e) => setProductArrivalCost(e.target.value)}
                />
              </div>
              <div>
                <TextField
                  margin="dense"
                  id="sellingPrice"
                  label="Selling Price"
                  type="number"
                  fullWidth
                  variant="standard"
                  value={sellingPrice}
                  onChange={(e) => setProductSellingPrice(e.target.value)}
                />
              </div>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={createProduct}>
                Save
            </Button>
          </DialogActions>
        </Dialog>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            {/* Nomeclature Table Column Headers */}
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Type</TableCell>
                <TableCell align="right">Barcode</TableCell>
                <TableCell align="right">Arriving Cost</TableCell>
                <TableCell align="right">Selling Price</TableCell>
                <TableCell align="center" style={{width: 10}}>Actions</TableCell>
              </TableRow>
            </TableHead>

            {/* Nomeclature Table Content */}
            <TableBody>
              {products.map((product) => (
                <TableRow
                  key={product.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >

                  <TableCell component="th" scope="row">{product.name}</TableCell>
                  <TableCell align="right">{product.type}</TableCell>
                  <TableCell align="right">{product.barcode}</TableCell>
                  <TableCell align="right">{product.arrivingCost}</TableCell>
                  <TableCell align="right">{product.sellingPrice}</TableCell>
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
                        <Link to={`/nomenclature/${product.id}`}>
                          <IconButton
                            size="small"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="inherit"
                          >
                            <EditIcon />
                          </IconButton>
                        </Link>
                      </div>
                      <div>
                        <IconButton
                          size="small"
                          aria-label="account of current user"
                          aria-controls="menu-appbar"
                          aria-haspopup="true"
                          color="inherit"
                          onClick={() => deleteProduct(product.id)}
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
  
export default NomenclatureTable;