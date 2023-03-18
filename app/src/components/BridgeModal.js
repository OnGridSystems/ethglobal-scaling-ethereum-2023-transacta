import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Paper, Typography } from "@mui/material";
import TokenCard from "./TokenCard";
import ChainCard from "./ChainCard";
import { ArrowCircleRightOutlined as ArrowIcon } from "@mui/icons-material";
import networks from "../networks.json";
import useConnection from "../hooks/useConnection";

/**
 * @param {string} fromId Chain Id of current item
 * @param {string} toId Chain Id of selected network
 * @returns if exist, price with format "%price% %ticker%", else null
 */
const getBridgePrice = (fromId, toId) => {
  const price = networks[fromId]?.brigingPrice[toId]?.value
  const ticker = networks[fromId]?.params?.nativeCurrency?.symbol
  return price && ticker ? `${price} ${ticker}` : null
}

function BridgeModal({ isOpen, toggle, currentItem }) {
  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (isOpen) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [isOpen]);
  const connection = useConnection();
  const bridgePrice = useMemo(
    () => getBridgePrice(
      currentItem.chainId, 
      connection.chainId
    ), [connection.chainId, currentItem.chainId]
  )

  return (
    <Dialog
      open={isOpen}
      onClose={toggle}
      scroll="body"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogContent>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap="1rem"
        >
          <TokenCard {...currentItem} />
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <Paper
              sx={{
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <Typography align="center">
                The token will be transferred to another network
              </Typography>
              <BridgeModal.FromTo from={currentItem.chainId} to={connection.chainId} />
              <Typography align="center">
                Approve and bridging token to another network. The stages of
                bridging will be shown here.
              </Typography>
              <div>
                <Typography align="center" variant="h4">
                  {bridgePrice}
                </Typography>
                <Typography align="center" variant="body2">
                  Price per translation
                </Typography>
              </div>
              <Typography align="center">
                The amount payable is estimated. You will pay at least {bridgePrice+' '} 
                or the transaction will be rolled back
              </Typography>
              <Button
                onClick={bridgePrice && toggle}
                variant="contained"
                fullWidth
                size="large"
                disabled={!bridgePrice}
              >
                Switch network
              </Button>
            </Paper>
          </DialogContentText>
        </Box>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
}

BridgeModal.FromTo = ({from, to}) => {
  return (
    <Box
      display="flex"
      justifyContent="space-around"
      alignItems="center"
    >
      <ChainCard chainId={from} />
      <ArrowIcon fontSize="large" />
      <ChainCard chainId={to} />
    </Box>
  )
}

export default BridgeModal;
