import { useQuery } from "react-query";
import { useWalletContext } from "../contexts/wallet-context";
import { useCallback, useMemo } from "react";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";

export default function Home() {
  const { callContract } = useWalletContext();

  const getNftList = useCallback(async () => {
    const currentNum = await callContract({
      methodName: "currentNum",
      params: [],
    });

    return Promise.all(
      new Array(Number(currentNum)).fill(null).map(async (_, index) => {
        const num = index + 1;

        const [imageUrl, name] = await Promise.all([
          callContract({
            methodName: "tokenURI",
            params: [num],
          }),
          callContract({
            methodName: "participants",
            params: [num],
          }),
        ]);

        return {
          imageUrl,
          name,
        };
      })
    );
  }, [callContract]);

  const { data: nftListData } = useQuery(["getNftList"], getNftList);

  const widget = useMemo(
    () =>
      window.cloudinary.createUploadWidget(
        {
          cloudName: "daeyong",
          uploadPreset: "hb6qefbh",
        },
        (err, result) => {
          if (result.event === "success") {
            fetch(`http://13.209.66.180:3000/exec`);
          }
        }
      ),
    []
  );

  const openUploadWidget = useCallback(() => {
    widget.open();
  }, [widget]);

  return (
    <Container>
      <Button size="big" onClick={openUploadWidget}>
        Upload Image
      </Button>
      <Header as="h1">Previous Editions</Header>
      <Segment.Group>
        {(nftListData || []).map(({ imageUrl, name }, index) => (
          <Segment>
            <Header as="h3">
              Edition #{index} ({name})
            </Header>
            <Image src={imageUrl} size="small" />
          </Segment>
        ))}
      </Segment.Group>
    </Container>
  );
}
