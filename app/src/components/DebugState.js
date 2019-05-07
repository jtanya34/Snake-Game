import React from 'react';
import { puke } from '../helpers/util';

const styles = { position: 'fixed', top: 0, left: 16 };
export default ({ data }) => <div style={styles}>{puke(data)}</div>