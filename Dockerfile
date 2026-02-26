FROM condaforge/miniforge3
WORKDIR /app
RUN apt update
RUN apt install -y npm
RUN npm install -g typescript
RUN git clone https://github.com/xcube-dev/xcube-viewer/ && \
    cd xcube-viewer && \
    git reset --hard d81bbcf31d324c4da140f4e3c7a371106c2fac5f

COPY config.json ./xcube-viewer/src/resources/config.json

COPY TimeSeriesChart.tsx ./xcube-viewer/src/components/TimeSeriesPanel/TimeSeriesChart.tsx

COPY TimeSeriesLine.tsx ./xcube-viewer/src/components/TimeSeriesPanel/TimeSeriesLine.tsx

COPY CustomTooltip.tsx ./xcube-viewer/src/components/TimeSeriesPanel/CustomTooltip.tsx

COPY util.ts ./xcube-viewer/src/components/TimeSeriesPanel/util.ts

COPY TimeSelect.tsx ./xcube-viewer/src/components/TimeSelect.tsx

COPY controlState.ts ./xcube-viewer/src/states/controlState.ts

COPY OEMC_Logo.png ./xcube-viewer/public/images/OEMC_Logo.png

RUN cd xcube-viewer && npm ci

RUN cd xcube-viewer && npm run build


RUN git clone https://github.com/xcube-dev/xcube.git && \
    cd xcube && \
    git reset --hard 302957514d11b01b40b90c09fb209910b8917a7d

RUN echo $(ls -1 ./xcube-viewer/)

RUN  cp -rf ./xcube-viewer/dist ./xcube/xcube/webapi/viewer/

RUN cd ./xcube && \
    conda init .

RUN conda activate ./xcube && \
    pip install -ve

EXPOSE 80

COPY config.yml ./config.yml

COPY places ./places

CMD xcube serve -c config.yml /data/data.zarr -p 80