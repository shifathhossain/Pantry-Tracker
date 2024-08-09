'use client'

import { useState, useEffect, useCallback } from 'react';
import { Box, Stack, Typography, Button, Modal, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { firestore } from '@/firebase';
import {
  collection,
  doc, getDocs, query, setDoc, deleteDoc, getDoc,
} from 'firebase/firestore';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
};

const Home = () => {
  const [pantry, setPantry] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [itemToEdit, setItemToEdit] = useState(null);
  const [editQuantity, setEditQuantity] = useState(0);
  const [sortCriteria, setSortCriteria] = useState('name');

  const fetchPantry = useCallback(async () => {
    try {
      const pantryQuery = query(collection(firestore, 'pantry'));
      const pantrySnapshot = await getDocs(pantryQuery);
      const pantryList = pantrySnapshot.docs.map(doc => ({ name: doc.id, ...doc.data() }));
      setPantry(pantryList);
    } catch (error) {
      console.error('Error fetching pantry:', error);
    }
  }, []);

  useEffect(() => {
    fetchPantry();
  }, [fetchPantry]);

  const addItem = useCallback(async (itemName) => {
    try {
      const itemRef = doc(collection(firestore, 'pantry'), itemName);
      const itemSnap = await getDoc(itemRef);
      if (itemSnap.exists()) {
        const { quantity } = itemSnap.data();
        await setDoc(itemRef, { quantity: quantity + 1 });
      } else {
        await setDoc(itemRef, { quantity: 1 });
      }
      await fetchPantry();
    } catch (error) {
      console.error('Error adding item:', error);
    }
  }, [fetchPantry]);

  const removeItem = useCallback(async (itemName) => {
    try {
      const itemRef = doc(collection(firestore, 'pantry'), itemName);
      const itemSnap = await getDoc(itemRef);
      if (itemSnap.exists()) {
        const { quantity } = itemSnap.data();
        if (quantity === 1) {
          await deleteDoc(itemRef);
        } else {
          await setDoc(itemRef, { quantity: quantity});
        }
      }
      await fetchPantry();
    } catch (error) {
      console.error('Error removing item:', error);
    }
  }, [fetchPantry]);

  const editItemQuantity = useCallback(async (itemName, newQuantity) => {
    try {
      const itemRef = doc(collection(firestore, 'pantry'), itemName);
      await setDoc(itemRef, { quantity: newQuantity });
      await fetchPantry();
    } catch (error) {
      console.error('Error editing item quantity:', error);
    }
  }, [fetchPantry]);

  const handleAddModalOpen = () => setIsAddModalOpen(true);
  const handleAddModalClose = () => setIsAddModalOpen(false);

  const handleEditModalOpen = (item) => {
    setItemToEdit(item);
    setEditQuantity(item.quantity);
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => setIsEditModalOpen(false);

  const handleSortChange = (event) => setSortCriteria(event.target.value);

  const sortedPantry = pantry.sort((a, b) => {
    if (sortCriteria === 'name') {
      return a.name.localeCompare(b.name);
    } else {
      return b.quantity - a.quantity;
    }
  });

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      gap={2}
    >
      {/* Add Item Modal */}
      <Modal
        open={isAddModalOpen}
        onClose={handleAddModalClose}
        aria-labelledby="add-modal-title"
        aria-describedby="add-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="add-modal-title" variant="h6" component="h2">
            Add Item
          </Typography>
          <Stack width="100%" direction="row" spacing={2}>
            <TextField
              id="item-name"
              label="Item"
              variant="outlined"
              fullWidth
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
            />
            <Button
              variant="outlined"
              onClick={() => {
                addItem(newItemName);
                setNewItemName('');
                handleAddModalClose();
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>

      {/* Edit Item Modal */}
      <Modal
        open={isEditModalOpen}
        onClose={handleEditModalClose}
        aria-labelledby="edit-modal-title"
        aria-describedby="edit-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="edit-modal-title" variant="h6" component="h2">
            Edit Item Quantity
          </Typography>
          <Stack width="100%" direction="row" spacing={2}>
            <TextField
              id="edit-quantity"
              label="Quantity"
              type="number"
              variant="outlined"
              fullWidth
              value={editQuantity}
              onChange={(e) => setEditQuantity(Number(e.target.value))}
            />
            <Button
              variant="outlined"
              onClick={() => {
                editItemQuantity(itemToEdit.name, editQuantity);
                handleEditModalClose();
              }}
            >
              Save
            </Button>
          </Stack>
        </Box>
      </Modal>

      <Button variant="contained" onClick={handleAddModalOpen}>
        Add New Item
      </Button>
      <FormControl variant="outlined" sx={{ minWidth: 200 }}>
        <InputLabel id="sort-label">Sort By</InputLabel>
        <Select
          labelId="sort-label"
          value={sortCriteria}
          onChange={handleSortChange}
          label="Sort By"
        >
          <MenuItem value="name">Name</MenuItem>
          <MenuItem value="quantity">Quantity</MenuItem>
        </Select>
      </FormControl>
      <Box border="1px solid #333">
        <Box
          width="800px"
          height="100px"
          bgcolor="#ADD8E6"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h2" color="#333" textAlign="center">
            Pantry Items
          </Typography>
        </Box>
        <Stack width="800px" height="300px" spacing={2} overflow="auto">
          {sortedPantry.map(({ name, quantity }) => (
            <Box
              key={name}
              width="100%"
              minHeight="150px"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              bgcolor="#f0f0f0"
              paddingX={5}
            >
              <Typography variant="h3" color="#333" textAlign="center">
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>
              <Typography variant="h3" color="#333" textAlign="center">
                Quantity: {quantity}
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button variant="contained" onClick={() => handleEditModalOpen({ name, quantity })}>
                  Edit
                </Button>
                <Button variant="contained" onClick={() => removeItem(name)}>
                  Remove
                </Button>
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default Home;
