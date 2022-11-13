import { Dialog } from "@mui/material";
import styled from "styled-components";

export const StyledTopBar = styled.div`
  width: 100%;
  height: 5rem;
  background-color: #002137;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 0;
  font-weight: bold;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: x-large;
  img {
    width: 5rem;
  }
`;
export const TableContainer = styled.div`
  display: flex;
  padding-top: 20%;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  max-width: 70vw;
  height: 100%;
  max-height: 80vh;
  align-items: center;
  width: 100%;
  overflow-x: auto;  
  
  @media only screen and (max-width: 740px) {
    max-width: 90vw;
  }
  table {
    width: 100%;
  }
`;

export const CustomDialog = styled(Dialog)`
  h2 {
    display: flex;
    align-items: center;
    padding: 0;
    margin-bottom: 20px;
  }
  .MuiDialog-paper {
    width: 550px;
    padding: 20px 24px;
  }
  .MuiDialogContent-root {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 0;
    margin-bottom: 20px;
  }
  .MuiDialogActions-root {
    .MuiButton-containedPrimary {
      background-color: #002137;
    }
    .MuiButton-textPrimary {
      color: #002137;
    }
  }
  .DialogContent{
    flex-direction: column
  }
`;
export const TableHeader = styled.div`
  position: sticky;
  background-color: #fafafa;
  top: 0;
  width: 100%;
  display: flex;
  z-index: 100;
  margin-bottom: 15px;
  justify-content: space-between;

  h2 {
    font-size: 24px;
  }
  Button{
    background-color: #002137;
  }
`;

export const ContentContainer = styled.div`  
  width: 100%;
  display: flex;
  flex-direction: row;
  background-color: blue;
  align-items: center;
  justify-content: center;
  
`
