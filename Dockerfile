FROM continuumio/miniconda3
WORKDIR /app
RUN apt update
RUN apt install -y npm
RUN git clone https://github.com/xcube-dev/xcube-viewer.git

COPY config.json ./xcube-viewer/src/resources/config.json

RUN npm run build ./xcube-viewer/

RUN git clone https://github.com/xcube-dev/xcube.git

RUN  mv ./xcube-viewer/dist ./xcube/webapi/viewer/data 

RUN pip install -ve ./xcube
EXPOSE 80

# fix projsee https://github.com/conda-forge/geopandas-feedstock/issues/63
ENV PROJ_LIB=/opt/conda/share/proj

CMD xcube serve /data/data.zarr -p 80