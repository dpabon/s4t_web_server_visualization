FROM continuumio/miniconda3
WORKDIR /app
RUN git clone https://github.com/xcube-dev/xcube-viewer.git
RUN 
RUN git clone https://github.com/xcube-dev/xcube.git
COPY config.json ./xcube/src/resources/config.json
RUN pip install -ve ./xcube
EXPOSE 80

# fix projsee https://github.com/conda-forge/geopandas-feedstock/issues/63
ENV PROJ_LIB=/opt/conda/share/proj

CMD xcube serve /data/data.zarr -p 80