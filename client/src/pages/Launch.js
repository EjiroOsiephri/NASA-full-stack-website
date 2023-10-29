import { useMemo } from "react";
import { Appear, Button, Loading, Paragraph } from "arwes";
import Clickable from "../components/Clickable";

const Launch = (props) => {
  const selectorBody = useMemo(() => {
    return props.planets?.map((planet) => (
      <option value={planet.kepler_name} key={planet.kepler_name}>
        {planet.kepler_name}
      </option>
    ));
  }, [props.planets]);

  const today = new Date().toISOString().split("T")[0];

  return (
    <Appear id="launch" animate show={props.entered}>
      <Paragraph
        style={{
          fontSize: "18px",
        }}
      >
        Schedule a mission launch for interstellar travel to one of the Kepler
        Exoplanets.
      </Paragraph>
      <Paragraph
        style={{
          fontSize: "18px",
        }}
      >
        Only confirmed planets matching the following criteria are available for
        the earliest scheduled missions:
      </Paragraph>
      <ul
        style={{
          fontSize: "17px",
        }}
      >
        <li>Planetary radius &lt; 1.6 times Earth's radius</li>
        <li>
          Effective stellar flux &gt; 0.36 times Earth's value and &lt; 1.11
          times Earth's value
        </li>
      </ul>

      <form
        onSubmit={props.submitLaunch}
        style={{
          display: "inline-grid",
          gridTemplateColumns: "auto auto",
          gridGap: "10px 20px",
        }}
      >
        <label
          style={{
            fontSize: "17px",
          }}
          htmlFor="launch-day"
        >
          Launch Date
        </label>
        <input
          type="date"
          id="launch-day"
          name="launch-day"
          min={today}
          max="2040-12-31"
          defaultValue={today}
        />
        <label
          style={{
            fontSize: "17px",
          }}
          htmlFor="mission-name"
        >
          Mission Name
        </label>
        <input type="text" id="mission-name" name="mission-name" />
        <label
          style={{
            fontSize: "17px",
          }}
          htmlFor="rocket-name"
        >
          Rocket Type
        </label>
        <input
          style={{
            width: "100%",
            marginLeft: "-1em",
          }}
          type="text"
          id="rocket-name"
          name="rocket-name"
          defaultValue="Explorer IS1"
        />
        <label htmlFor="planets-selector">Destination Exoplanet</label>
        <select id="planets-selector" name="planets-selector">
          {selectorBody}
        </select>
        <Clickable>
          <Button
            animate
            show={props.entered}
            type="submit"
            layer="success"
            disabled={props.isPendingLaunch}
            style={{
              width: "100%",
              fontSize: "17px",
              whiteSpace: "noWrap",
            }}
          >
            Launch Mission ✔
          </Button>
        </Clickable>
        {props.isPendingLaunch && <Loading animate small />}
      </form>
    </Appear>
  );
};

export default Launch;
